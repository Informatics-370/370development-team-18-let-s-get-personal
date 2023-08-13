import { Component, OnInit, EnvironmentInjector, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController, IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
//for modal
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
//services and models
import { StockItemDataService } from 'src/app/Services/stockitem.service';
import { Stock_Item } from 'src/app/Models/stockitem';
import { BestsellersService } from 'src/app/Services/bestsellers.service';
import { InventoryDataService } from 'src/app/Services/inventory.service';
import { StockTypes } from 'src/app/Models/stocktypes';
import { StockTypeDataService } from 'src/app/Services/stocktype.service';
import { StockItemColours } from 'src/app/Models/stockitemcolour';
import { StockItemColourDataService } from 'src/app/Services/stockitemcolours.service';
import { Stock_Image } from 'src/app/Models/stockimage';
import { StockImageDataService } from 'src/app/Services/stockimage.service';
import { StockItemViewModel } from 'src/app/ViewModels/stockitemsVM';
import { InventoryViewModel } from 'src/app/ViewModels/InventoryVM';
import { PersonalisationService } from 'src/app/Services/personalisation.service';
import { Image_Price } from 'src/app/Models/imageprice';
import { TextPrice } from 'src/app/Models/textprice';
@Component({
  selector: 'app-stock-take',
  templateUrl: './stock-take.page.html',
  styleUrls: ['./stock-take.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class StockTakePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal
  errormsg: string = ""; 
  inventory: InventoryViewModel[] =[];
  Products: StockItemViewModel[] = [];

  stockitems!: Stock_Item[];
  stocktypes: StockTypes[] =[];
  stockitemcolours: StockItemColours[] = [];
  stockimages: Stock_Image[] =[];

  textprice: TextPrice[] =[]
  imageprice: Image_Price[] =[]

  constructor(public environmentInjector: EnvironmentInjector, private router: Router,
    public bestsellerservice:BestsellersService, private alertController:AlertController,     
    //dataservices
    public stockitemservice: StockItemDataService, private typeservice:StockTypeDataService,
    private imageservice:StockImageDataService, private colourservice:StockItemColourDataService,
    private inventoryservice: InventoryDataService, public pservice: PersonalisationService) { }
    
  ngOnInit() {
    this.GetAllStockItems();
    this.GetStockImages();
    this.GetStockItemColours();
    this.GetStockTypes();
  }

  GetAllStockItems(){
    this.stockitemservice.GetStockItems().subscribe(result =>{
      this.Products = result as StockItemViewModel[];
    })    
  }

  AddStockForm: FormGroup = new FormGroup({
    Stock_Item_Name: new FormControl('',[Validators.required]),
    Stock_Item_Price: new FormControl('',[Validators.required]),
    Stock_Item_Size: new FormControl('',[Validators.required]),
    Inventory_Comments: new FormControl(''),
    Stock_Item_Quantity: new FormControl('',[Validators.required]),
    Stock_Type_ID: new FormControl('',[Validators.required]),
    Stock_Image_ID: new FormControl('',[Validators.required]),
    Stock_Item_Colour_ID: new FormControl('',[Validators.required]),
  })

  AddStockItem(){
    let addStockItem = new Stock_Item();
    addStockItem.stock_Item_Name = this.AddStockForm.value.Stock_Item_Name;
    addStockItem.stock_Item_Price = this.AddStockForm.value.Stock_Item_Price;
    addStockItem.stock_Item_Size = this.AddStockForm.value.Stock_Item_Size;
    addStockItem.inventory_Comments = this.AddStockForm.value.Inventory_Comments;
    addStockItem.stock_Item_Quantity = this.AddStockForm.value.Stock_Item_Quantity;
    addStockItem.stock_Type_ID = this.AddStockForm.value.Stock_Type_ID;
    addStockItem.stock_Image_ID = this.AddStockForm.value.Stock_Image_ID;
    addStockItem.stock_Item_Colour_ID = this.AddStockForm.value.Stock_Item_Colour_ID;
    

    this.stockitemservice.AddStockItem(addStockItem).subscribe(result => {
      if(result.status == "Error")
        {
          this.AddStockItemErrorAlert();
          this.errormsg = result.Message;
        }
      else if(result.status == "Success")
        {
          console.log(addStockItem)
          this.AddStockItemSuccessAlert();
        }
    }) 
  }


  GetStockTypes(){
    this.typeservice.GetStockTypes().subscribe(result =>{
      this.stocktypes = result as StockTypes[];
      console.log(this.stocktypes);
    })
  }
  
  GetStockImages(){
    this.imageservice.GetAllStockImages().subscribe(result =>{
      this.stockimages = result as Stock_Image[];
      console.log(this.stockimages);
    })    
  }

  GetStockItemColours(){
    this.colourservice.GetStockItemColours().subscribe(result =>{
      this.stockitemcolours = result as StockItemColours[];
      console.log(this.stockitemcolours)      
    })   
  }
  
  getImagePrice(){
    this.pservice.GetAllImagePrices().subscribe(result => {
      this.imageprice = result as Image_Price[];
      console.log(this.imageprice)
    })
  }

  getTextPrice(){
    this.pservice.GetAllTextPrices().subscribe(result => {
      this.textprice = result as TextPrice[];
      console.log(this.textprice)
    })
  }

  canceladdmodal() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmaddmodal() {
    this.AddStockItem();    
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  reloadPage(){
    window.location.reload()
  }

  async AddStockItemSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Stock Item added',
      buttons: [{
          text: 'OK',
          role: 'cancel',
          handler:() =>{
            this.reloadPage();
          }
      }],
    });
    await alert.present();
  }

  async AddStockItemErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Stock Item was not added',
      message: this.errormsg,
      buttons: [{
          text: 'OK',
          role: 'cancel',
          handler:() =>{
            this.reloadPage();
          }
      }],
    });
    await alert.present();
  }
}
