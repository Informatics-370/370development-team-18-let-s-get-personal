import { Component, OnInit, EnvironmentInjector, ViewChild, ElementRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { StockItemDataService } from 'src/app/Services/stockitem.service';
import { Stock_Item } from 'src/app/Models/stockitem';
import { BestsellersService } from 'src/app/Services/bestsellers.service';
import { StockItemViewModel } from 'src/app/ViewModels/stockitemsVM';
import { PersonalisationService } from 'src/app/Services/personalisation.service';

import { LoadingController } from '@ionic/angular';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export type jsPDFDocument = any;
type Opts = { [key: string]: string | number }

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class InventoryPage implements OnInit {
  private readonly jsPDFDocument: jsPDFDocument
  Products: StockItemViewModel[] = [];
  searchString: string = "";
  searchedinventory: StockItemViewModel[] = [];
  loadingController: any;
  constructor(public environmentInjector: EnvironmentInjector, private router: Router,
    public bestsellerservice:BestsellersService, private alertController:AlertController,  
    public stockitemservice: StockItemDataService, public pservice: PersonalisationService, 
    public loadingController: LoadingController) { }

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
  }

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

  search(){

    
    console.log("Kamo "+this.SearchStockForm.get('name')?.value);
    this.searchString=this.SearchStockForm.get('name')?.value;

   /*console.log(this.Products);
   this.Products.forEach(e=>{
    if(e.inventory_Date==this.SearchStockForm.get('startdate')?.value)
     if(new Date(e.inventory_Date)===new Date(this.SearchStockForm.get('startdate')?.value))
      console.log("Hallo world");
   })*/

    this.searchedinventory = this.Products.filter(
      f => f.stock_Item_Name.toLowerCase().includes(this.searchString.toLowerCase()));
  }


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

  GetAllStockItems(){
    this.stockitemservice.GetStockItems().subscribe(result =>{
      this.Products = result as StockItemViewModel[];
      this.searchedinventory=this.Products;
    })    
  }

  @ViewChild('htmlData') htmlData!: ElementRef;
  
  openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {       
      //Initialize JSPDF
      let PDF = new jsPDF('p', 'mm', 'a4');
      //Converting canvas to Image
      const FILEURI = canvas.toDataURL('image/png');
      //Add image Canvas to PDF
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;      
      let position = 10;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);        
          
      PDF.save('IPKP-Products.pdf');
    });
  }
  
  addToBestSellers(bestseller: Stock_Item[]){
    this.bestsellerservice.SaveBestSellersList(bestseller).subscribe((response:any) => {
      if(response == null)
      {
        this.addToBestSellersErrorAlert();
      }
      else{
        this.addToBestSellersSuccessAlert();
      }
    })
  }

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
}
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