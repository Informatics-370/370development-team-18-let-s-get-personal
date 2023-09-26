import { Component, OnInit, EnvironmentInjector, ViewChild, ElementRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicModule, LoadingController, IonModal, ModalController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';
import { AuditTrailService } from '../Services/audittrail.service';
import { AuditTrail } from '../Models/adittrail';
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
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts"; 

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

  stocktypes: StockTypes[] =[];
  stockitemcolours: StockItemColours[] = [];
  stockimages: Stock_Image[] =[];
  
  
  constructor(public environmentInjector: EnvironmentInjector, private router: Router,
    public bestsellerservice:BestsellersService, private alertController:AlertController,  
    public stockitemservice: StockItemDataService, public pservice: PersonalisationService, 
    public loadingController: LoadingController, private typeservice:StockTypeDataService,
    private imageservice:StockImageDataService, private colourservice:StockItemColourDataService,
    private excelservice: ExcelService, private trailservice: AuditTrailService) 
  {
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

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
      f => f.stock_Item_Name.toLowerCase().includes(this.searchString.toLowerCase())
    );
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
      this.action = "Downloaded Inventory Report"
      this.AddTrail()
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

//========= Download PDF ========
  generatePDF() {  
    let user = JSON.parse(JSON.stringify(localStorage.getItem('username')))
    let date = new Date
    
    let docDefinition = {  
      fillColor: "White",
      fillOpacity: "",
      margin: [ 5, 10, 5, 5 ],
      header: user+" - It's Personal Inventory",  
      footer:'Downloaded by: '+ user + ' at: '+ date,        
      content:[
        {          
          layout: 'lightHorizontalLines', // optional          
          table: {
            headerRows: 1,
            //widths: [ '30%', '40%', '30%' ],
            // margin: [left, top, right, bottom]
            margin: [ 5, 10, 5, 5 ],
            
            body: [
              [ 'Product', 'Type', 'Colour', 'Image', 'Size', 'Quantity', 'Price', 'Inventory Comments' ],
              ...this.Products.map(p => 
                ([
                  p.stock_Item_Name, p.stockTypeName, p.stockColourName, p.stockImageName, p.stock_Item_Size,
                  p.stock_Item_Quantity, p.stock_Item_Price, p.inventory_Comments
                ])),
            ]
          }          
        }
      ]      
    };  
    pdfMake.createPdf(docDefinition).download();      
  }

  
//========= add ========
  size= ['Small', 'Medium','Large'];
  AddStockForm: FormGroup = new FormGroup({
    Stock_Item_Name: new FormControl('',[Validators.required]),
    Stock_Item_Price: new FormControl('',[Validators.required]),
    Stock_Item_Size: new FormControl('',[Validators.required]),
    Inventory_Comments: new FormControl(''),
    Stock_Item_Quantity: new FormControl('',[Validators.required]),
    Stock_Type_ID: new FormControl('',[Validators.required]),
    //Stock_Image_ID: new FormControl('',[Validators.required]),
    Stock_Item_Colour_ID: new FormControl('',[Validators.required]),
  })

  canceladdmodal() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmaddmodal() {
    //this.AddStockItem();  
    this.addStockImage();
  }

  AddStockItem(){
    if(this.AddStockForm.valid){

    let addStockItem = new Stock_Item();
    addStockItem.stock_Item_Name = this.AddStockForm.value.Stock_Item_Name;
    addStockItem.stock_Item_Price = this.AddStockForm.value.Stock_Item_Price;
    addStockItem.stock_Item_Size = this.AddStockForm.value.Stock_Item_Size;
    addStockItem.inventory_Comments = this.AddStockForm.value.Inventory_Comments;
    addStockItem.stock_Item_Quantity = this.AddStockForm.value.Stock_Item_Quantity;
    addStockItem.stock_Type_ID = this.AddStockForm.value.Stock_Type_ID;
    addStockItem.stock_Image_ID = this.addedimageID;
    addStockItem.stock_Item_Colour_ID = this.AddStockForm.value.Stock_Item_Colour_ID;
    

    this.stockitemservice.AddStockItem(addStockItem).subscribe(result => {
      console.log(addStockItem)     
      this.AddStockItemSuccessAlert();

      this.action = "Added Product: " + this.AddStockForm.value.Stock_Item_Name
      this.AddTrail()
      
    }, 
    (error) => {
      this.AddStockItemErrorAlert();
      console.error('Add stock item error:', error);
    }); 
    //this.presentLoading();
   }
  }  

  AddImageForm:FormGroup = new FormGroup({
    imagefile: new FormControl('',[Validators.required]),     
    name: new FormControl('',[Validators.required]), 
  }); 

  formData = new FormData();
  fileNameUploaded = ''
  addedimageID: any
  uploadFile = (files: any) => {
    let fileToUpload = <File>files[0];
    
    // Check if the file is an image (you can extend this check with more image types)
    if (fileToUpload.type.startsWith('image/')) {
      this.formData.append('file', fileToUpload, fileToUpload.name);
      this.fileNameUploaded = fileToUpload.name;
    } else {
      // Display an error message or handle the non-image file as needed
      this.fileNameUploaded = 'Invalid file type. Please choose an image file.';
    }
  }

  addStockImage(){
    this.formData.append('name', this.AddImageForm.get('name')!.value);
    this.imageservice.AddStockImage(this.formData).subscribe(result => {
      let stockimage = result as Stock_Image
      this.addedimageID = stockimage.stock_Image_ID
      let imageName = stockimage.stock_Image_Name
      console.log(this.addedimageID)

      if(this.addedimageID == null){
        this.AddStockImageErrorAlert()
      }
      else{
        this.AddStockItem()
        this.action = "Uploaded Image: " + imageName
        this.AddTrail()
      }
    },(error) => {
      this.errormsg = error
      this.AddStockImageErrorAlert();        
      console.error('Add stock image error:', error);
    })         
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

  EditProduct(stock_Item_ID:string, isOpen: boolean)
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

      this.action = "Updated Product " + this.editForm.value.Stock_Item_Name 
      this.AddTrail()
    },(error) => {
      this.errormsg = error
      this.editErrorAlert();        
      console.error('Update stock item error:', error);
    })   
  }

  canceleditmodal() {
    this.isModalOpen = false;
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

//============== Delete =======
deletestockitemID!: string
deletestockimageID!: string 
deletestockitemname!: string 
  DeleteStockItem(){
    this.stockitemservice.DeleteStockItem(this.deletestockitemID).subscribe(result =>{
      if(result.status == "Success"){
        this.DeleteStockItemSuccessAlert(); 
        this.deleteStockImage(this.deletestockimageID, this.deletestockitemname)

        this.action = "Deleted Product: " + this.deletestockitemname
        this.AddTrail()
      }
      else{
        this.DeleteStockItemErrorAlert();
      }      
    },(error) => {
      this.errormsg = error
      this.DeleteStockItemErrorAlert();
      
      console.error('Delete stock item error:', error);
    });
  }

  deleteStockImage(stock_Image_ID:string, stockItemName:string){
    this.imageservice.DeleteStockImage(stock_Image_ID).subscribe(result =>{
      this.action = "Deleted Stock Image for product: " + stockItemName
      this.AddTrail()

      //this.DeleteStockImageSuccessAlert()
    },(error) => {
      this.DeleteStockImageErrorAlert();        
      console.error('Delete stock image error:', error);
    });
  }

//============== Audit Trail =======
  action!: string
  AddTrail(){
    let audittrail = new AuditTrail()
    let roles = JSON.parse(JSON.stringify(localStorage.getItem('roles'))); //userID
    let userID = JSON.parse(JSON.stringify(localStorage.getItem('userID'))) //JSON.parse(localStorage.getItem('userID') as string)

    
    if(roles == "Admin"){
      audittrail.admin_ID = userID
      audittrail.actionName = this.action
      this.trailservice.AddAdminAuditTrailItem(audittrail).subscribe(result =>{
        console.log(result)
      })
    }
    else{
      audittrail.employee_ID = userID
      audittrail.actionName = this.action
      this.trailservice.AddEmployeeAuditTrail(audittrail).subscribe(result =>{
        console.log(result)
      })
    }
  }


//============== Gets =======
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
  stocktypesnav()
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
  bestellersnav()
  {
    this.router.navigate(['./tabs/best-sellers']);
  }
  pricehistorynav()
  {
    this.router.navigate(['./tabs/price-history']);
  }

//============== Alerts =======
  async HelpAlert() {
    const alert = await this.alertController.create({
      header: 'Each product will be automatically pulled through to the customers Shop Page', 
      subHeader: 'Please Note: You are required to add the product image while adding a product',
      buttons: [{
          text: 'OK',
          role: 'cancel',
      }],
    });
    await alert.present();
  } 

  async AddStockImageSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Stock Image added',
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
  
  async AddStockImageErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Error details:',
      message: this.errormsg ,
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

  async ConfirmDeleteStockItemSuccessAlert(stockitemID: string, stockimageID: string, stockitemname:string) {
    this.deletestockitemID = stockitemID
    this.deletestockimageID = stockimageID
    this.deletestockitemname = stockitemname
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      subHeader: 'This action will remove item from transactional reports and customers will no longer be able to order it',
      message: 'This action will also remove the image associated with this Product',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler:() =>{
          this.DeleteStockItem();
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }],
    });
    await alert.present();
  }

  async DeleteStockItemSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Product deleted',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async DeleteStockItemErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Error details:',
      message: this.errormsg ,
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
      subHeader: 'Error details:',
      message: this.errormsg ,
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

  async DeleteStockImageSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Stock Image Deleted',
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
  
  async DeleteStockImageErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Stock Image was not deleted',
      message: 'Please note we cannot delete images that are being used in a product',
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