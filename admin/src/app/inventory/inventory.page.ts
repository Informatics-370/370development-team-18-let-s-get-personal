import { Component, OnInit, EnvironmentInjector, ViewChild, ElementRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicModule, LoadingController, IonModal, ModalController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';

import { StockItemDataService } from 'src/app/Services/stockitem.service';
import { PersonalisationService } from 'src/app/Services/personalisation.service';
import { BestsellersService } from 'src/app/Services/bestsellers.service';
import { StockTypeDataService } from 'src/app/Services/stocktype.service';
import { StockItemColourDataService } from 'src/app/Services/stockitemcolours.service';
import { StockImageDataService } from 'src/app/Services/stockimage.service';
import { ExcelService } from '../Services/excel.service';

import { StockItemViewModel } from 'src/app/ViewModels/stockitemsVM';
import { Stock_Item } from 'src/app/Models/stockitem';
import { StockTypes } from 'src/app/Models/stocktypes';
import { StockItemColours } from 'src/app/Models/stockitemcolour';
import { Stock_Image } from 'src/app/Models/stockimage';
import { ExcelViewModel } from '../ViewModels/excelVM';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class InventoryPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal
  errormsg: string = ""; 

  Products: StockItemViewModel[] = [];
  searchString: string = "";
  searchedinventory: StockItemViewModel[] = [];

  stockTypes: StockTypes[] =[];
  stockitemcolours: StockItemColours[] = [];
  stockimages: Stock_Image[] =[];
  
  
  constructor(public environmentInjector: EnvironmentInjector, private router: Router,
    public bestsellerservice:BestsellersService, private alertController:AlertController,  
    public stockitemservice: StockItemDataService, public pservice: PersonalisationService, 
    public loadingController: LoadingController, private typeservice:StockTypeDataService,
    private imageservice:StockImageDataService, private colourservice:StockItemColourDataService,
    private excelservice: ExcelService) { }

  SearchStockForm: FormGroup = new FormGroup({
    /*startdate: new FormControl('',[Validators.required]),
    enddate: new FormControl('',[Validators.required]),*/
    name:new FormControl('',[Validators.required])
  })

  ngOnInit() {
    this.GetAllStockItems();
    if(this.searchString === "")
    {
      this.searchedinventory = this.Products;
    }
    this.GetStockImages();
    this.GetStockItemColours();
    this.GetStockTypes();
    this.getExcelData();
  }  

  search(){    
    console.log("Kamo "+this.SearchStockForm.get('name')?.value);
    this.searchString=this.SearchStockForm.get('name')?.value;

    this.searchedinventory = this.Products.filter(
      f => f.stock_Item_Name.toLowerCase().includes(this.searchString.toLowerCase()));
  }

  GetAllStockItems(){
    this.stockitemservice.GetStockItems().subscribe(result =>{
      this.Products = result as StockItemViewModel[];
      this.searchedinventory = this.Products;
    })    
  }

  //========= Excel export ========
  excelData: ExcelViewModel[] = []
  exportToExcel() 
  {
    try
    {      
      let user = JSON.parse(JSON.stringify(localStorage.getItem('username')))
      let date = new Date
      date.setHours(0, 0, 0, 0)
      console.log(date)
      this.excelservice.exportToExcel(this.excelData, user + 'IPKP-Products'); // + date
    }
    catch
    {
      this.ExcelDownloadErrorAlert()
    }    
  }

  getExcelData(){
    this.excelservice.GetInventoryList().subscribe(result =>{
      this.excelData = result as ExcelViewModel[];
      console.log(this.excelData)
    })
  }

  size= ['Small', 'Medium','Large'];
  //========= add ========
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
    if(this.AddStockForm.valid){

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
      console.log(addStockItem)
          this.AddStockItemSuccessAlert();
    }, 
    (error) => {
      this.AddStockItemErrorAlert();
      console.error('Add stock item error:', error);
    }); 
    //this.presentLoading();
   }
  }  

  canceladdmodal() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmaddmodal() {
    this.AddStockItem();    
  }


  //============== Edit =======
  isModalOpen = false;
  editProduct: Stock_Item = new Stock_Item();
  editForm: FormGroup = new FormGroup({
    Stock_Item_Name: new FormControl('',[Validators.required]),
    Stock_Item_Price: new FormControl('',[Validators.required]),
    Stock_Item_Size: new FormControl('',[Validators.required]),
    Inventory_Comments: new FormControl(''),
    // Stock_Item_Quantity: new FormControl('',[Validators.required]),
    Stock_Type_ID: new FormControl('',[Validators.required]),
    Stock_Image_ID: new FormControl('',[Validators.required]),
    Stock_Item_Colour_ID: new FormControl('',[Validators.required]),
  })

  EditDiscount(stock_Item_ID:string, isOpen: boolean)
  {    
    this.stockitemservice.GetStockItem(stock_Item_ID).subscribe(response => {         
      this.editProduct = response as Stock_Item;

      this.editForm.controls['Stock_Item_Name'].setValue(this.editProduct.stock_Item_Name);
      this.editForm.controls['Stock_Item_Price'].setValue(this.editProduct.stock_Item_Price);
      this.editForm.controls['Stock_Item_Size'].setValue(this.editProduct.stock_Item_Size);
      this.editForm.controls['Inventory_Comments'].setValue(this.editProduct.inventory_Comments);
      this.editForm.controls['Stock_Type_ID'].setValue(this.editProduct.stock_Type_ID);
      this.editForm.controls['Stock_Image_ID'].setValue(this.editProduct.stock_Image_ID);
      this.editForm.controls['Stock_Item_Colour_ID'].setValue(this.editProduct.stock_Item_Colour_ID);
    })
    
    this.isModalOpen = isOpen;
  }

  confirmeditmodal(){
    try
    {
      let editedProduct = new Stock_Item();
      editedProduct.stock_Item_Name = this.editForm.value.Stock_Item_Name;
      editedProduct.stock_Item_Price = this.editForm.value.Stock_Item_Price;
      editedProduct.stock_Item_Size = this.editForm.value.Stock_Item_Size;
      editedProduct.inventory_Comments = this.editForm.value.Inventory_Comments;
      editedProduct.stock_Type_ID = this.editForm.value.Stock_Type_ID;
      editedProduct.stock_Image_ID = this.editForm.value.Stock_Image_ID;
      editedProduct.stock_Item_Colour_ID = this.editForm.value.Stock_Item_Colour_ID;

      this.stockitemservice.UpdateStockItem(this.editProduct.stock_Item_ID, editedProduct).subscribe(result =>{
        this.editSuccessAlert();
      })
    }
    catch{      
      this.editErrorAlert();
    }    
  }

  canceleditmodal() {
    this.isModalOpen = false;
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  GetStockTypes(){
    this.typeservice.GetStockTypes().subscribe(result =>{
      this.stockTypes = result as StockTypes[];
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

  //============== Loading =======
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000,
    });
    
    await loading.present();
  
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  //============== Routes =======
  stocktypes()
  {
    this.router.navigate(['./tabs/stock-types']);
  }
  stockcoloursnav()
  {
    this.router.navigate(['./tabs/stock-item-colours']);
  }
  stockimagesnav()
  {
    this.router.navigate(['./tabs/stock-image']);
  }
  stocktakenav()
  {
    this.router.navigate(['./tabs/stock-take']);
  }

  //============== Alerts =======
  async addToBestSellersSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Item Added To Best Seller List',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async addToBestSellersErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Item Was Not Added',
      message: 'Please try again',
      buttons: ['OK'],
    });
    await alert.present();
  }

  
  async editSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Product Updated',
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

  async editErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Product Was Not Updated',
      message: 'Please try again',
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

  async ExcelDownloadErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'We could not download your file. Please try again.',
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

  reloadPage(){
    window.location.reload()
  }

}


   /*console.log(this.Products);
   this.Products.forEach(e=>{
    if(e.inventory_Date==this.SearchStockForm.get('startdate')?.value)
     if(new Date(e.inventory_Date)===new Date(this.SearchStockForm.get('startdate')?.value))
      console.log("Hallo world");
   })*/

  //========= Download pdf ========
  // @ViewChild('htmlData') htmlData!: ElementRef;  
  // openPDF(): void {
  //   let DATA: any = document.getElementById('htmlData');
  //   html2canvas(DATA).then((canvas: { toDataURL: (arg0: string) => any; height: number; width: number; }) => {       
  //     //Initialize JSPDF
  //     let PDF = new jsPDF('p', 'mm', 'a4');
  //     //Converting canvas to Image
  //     const FILEURI = canvas.toDataURL('image/png');
  //     //Add image Canvas to PDF
  //     let fileWidth = 208;
  //     let fileHeight = (canvas.height * fileWidth) / canvas.width;      
  //     let position = 10;
  //     PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);        
          
  //     PDF.save('IPKP-Products.pdf');
  //   });
  // }

// getImagePrice(){
  //   this.pservice.GetAllImagePrices().subscribe(result => {
  //     this.imageprice = result as Image_Price[];
  //     console.log(this.imageprice)
  //   })
  // }
  
  // getTextPrice(){
  //   this.pservice.GetAllTextPrices().subscribe(result => {
  //     this.textprice = result as TextPrice[];
  //     console.log(this.textprice)
  //   })
  // }