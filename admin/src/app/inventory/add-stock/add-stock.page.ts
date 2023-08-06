import { Component, OnInit, EnvironmentInjector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController, IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { BestsellersService } from 'src/app/Services/bestsellers.service';
import { BasketService } from 'src/app/Services/basket.service';
import { Inventory } from 'src/app/Models/inventory';
import { InventoryDataService } from 'src/app/Services/inventory.service';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

//stock items and dependencies
import { StockItemDataService } from 'src/app/Services/stockitem.service';
import { Stock_Item } from 'src/app/Models/stockitem';
import { StockTypes } from 'src/app/Models/stocktypes';
import { StockTypeDataService } from 'src/app/Services/stocktype.service';
import { StockItemColours } from 'src/app/Models/stockitemcolour';
import { StockItemColourDataService } from 'src/app/Services/stockitemcolours.service';
import { Stock_Image } from 'src/app/Models/stockimage';
import { StockImageDataService } from 'src/app/Services/stockimage.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.page.html',
  styleUrls: ['./add-stock.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class AddStockPage implements OnInit {

  inventory: Inventory[] =[];
  stockitems!: Stock_Item[];
  stocktypes: StockTypes[] =[];
  stockitemcolours: StockItemColours[] = [];
  stockimages: Stock_Image[] =[];
  constructor(public environmentInjector: EnvironmentInjector, private router: Router,
    public bestsellerservice:BestsellersService, private inventoryservice: InventoryDataService, 
    private alertController:AlertController,    
    //dataservices
    public stockitemservice: StockItemDataService, private typeservice:StockTypeDataService,
    private imageservice:StockImageDataService, private colourservice:StockItemColourDataService) { }

  ngOnInit() {
    this.GetStockImages();
    this.GetStockItemColours();
    this.GetStockTypes();
  }

  AddStockForm: FormGroup = new FormGroup({
    Stock_Item_Name: new FormControl('',[Validators.required]),
    Stock_Item_Price: new FormControl('',[Validators.required]),
    Stock_Item_Size: new FormControl('',[Validators.required]),
    Stock_Type_ID: new FormControl('',[Validators.required]),
    Stock_Image_ID: new FormControl('',[Validators.required]),
    Stock_Item_Colour_ID: new FormControl('',[Validators.required]),
  })

  AddStockItem(){
    let addStockItem = new Stock_Item();
    addStockItem.stock_Item_Name = this.AddStockForm.value.Stock_Item_Name;
    addStockItem.stock_Item_Price = this.AddStockForm.value.Stock_Item_Price;
    addStockItem.stock_Item_Size = this.AddStockForm.value.Stock_Item_Size;
    addStockItem.stock_Type_ID = this.AddStockForm.value.Stock_Type_ID;
    addStockItem.stock_Image_ID = this.AddStockForm.value.Stock_Image_ID;
    addStockItem.stock_Item_Colour_ID = this.AddStockForm.value.Stock_Item_Colour_ID;

    this.stockitemservice.AddStockItem(addStockItem).subscribe(result => {
      if(result.status == "Error")
        {
          this.AddStockItemErrorAlert();
        }
        else if(result.status == "Success"){
          this.AddStockItemSuccessAlert();
        }
      }) 
      console.log(addStockItem);         
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

  async AddStockItemSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Stock Item added',
      buttons: [{
          text: 'OK',
          role: 'cancel',
          handler:() =>{
            this.InventoryNav();
          }
      }],
    });
    await alert.present();
  }

  async AddStockItemErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Stock Item was not added',
      message: 'Please try again.',
      buttons: [{
          text: 'OK',
          role: 'cancel',
          handler:() =>{
            this.InventoryNav();
          }
      }],
    });
    await alert.present();
  }

  InventoryNav(){
    this.router.navigate(['./tabs/inventory']);
  }
}
