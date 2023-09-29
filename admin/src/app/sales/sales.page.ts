import { AfterViewInit, Component, ElementRef, ViewChild, OnInit, EnvironmentInjector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderService } from '../Services/order.service';
import { RouterModule, Router } from '@angular/router';
import { OrderLineItemVM } from '../ViewModels/orderlineitemVM';
import { SalesService } from '../Services/sales.service';
import { Payment } from '../Models/payment';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export type jsPDFDocument = any;
type Opts = { [key: string]: string | number }
import { StockItemViewModel } from 'src/app/ViewModels/stockitemsVM';
import { Stock_Item } from 'src/app/Models/stockitem';
import { BestSellerVM } from '../ViewModels/bestsellerVM';
import { Best_Sellers } from '../Models/bestsellers';
import { BestsellersService } from '../Services/bestsellers.service';
import { StockItemDataService } from 'src/app/Services/stockitem.service';
import { SalesVM } from '../ViewModels/salesVM';
import { StockTypeDataService } from '../Services/stocktype.service';
import { StockTypes } from '../Models/stocktypes';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class SalesPage implements OnInit {
  private readonly jsPDFDocument: jsPDFDocument
  
  constructor(private service: SalesService, private router: Router, public stockitemservice: StockItemDataService,
    public environmentInjector: EnvironmentInjector, private typeservice: StockTypeDataService, 
    private bestsellerservice: BestsellersService) 
  {
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }  
  isLoading: boolean = false;
  ngOnInit(): void {  
    this.isLoading=true;    
    this.GetStockTypes()
    this.GetSalesList()
    this.GetStockItems()
  }

  sales: Payment[] =[]
  GetSalesList()
  {
    this.service.GetAllSales().subscribe(res => {
      this.sales = res as Payment[]
      this.isLoading=false;  
    })
  }

  Products: StockItemViewModel[] = [];
  public GetStockItems() {
    this.stockitemservice.GetStockItems().subscribe(result => {
      this.Products = result as StockItemViewModel[];
      console.log(this.Products)
    })
  }

  getProductName(stockId: string): string {
    const product = this.Products.find(product => product.stock_Item_ID === stockId);
    
    return product ? product.stock_Item_Name : '';
    
  }

  controlbreak: SalesVM[] =[]
  total:any
  stocktypename: any
  stocktypes: StockTypes[] =[];

  //Get stock Types 
  GetStockTypes(){
    this.typeservice.GetStockTypes().subscribe(result =>{
      this.stocktypes = result as StockTypes[]; 
      this.stocktypes.forEach(stockType => {
    
        //Fetch Total per type
        this.GetControlBreak(stockType)
      });
    })
  }

  GetControlBreak(stockType: StockTypes)
  {
    this.service.GetSalesControlBreak(stockType.stock_Type_Name).subscribe(result => {
      // Set Items Control break list
      stockType.controlbreak = result;
      

      // Set Items Total by looping through Items
      stockType.stock_Type_Total = 0
      stockType.controlbreak.forEach(item => {
        stockType.stock_Type_Total = stockType.stock_Type_Total + item.total_Amount;
      });

    });
  }

  //Download control break
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

  //download saleslist
  generatePDF() {  
    let user = JSON.parse(JSON.stringify(localStorage.getItem('username')))
    let date = new Date
    
    let docDefinition = {  
      fillColor: "White",
      fillOpacity: "",
      margin: [ 5, 10, 5, 5 ],
      header: user+" - It's Personal Order Requests",  
      footer:'Downloaded by: '+ user + ' at: '+ date,        
      content:[
        {          
          layout: 'lightHorizontalLines', // optional          
          table: {
            headerRows: 1,
            widths: [ '20%', '20%', '20%', '20%', '20%'  ],
            // margin: [left, top, right, bottom]
            margin: [ 1, 10, 1, 5 ],
            
            body: [
              [ 'Customer', 'Product', 'Payment Amount', 'Quantity', 'Sale Date'],
              ...this.sales.map(p => 
                ([
                  p.customer_UserName, this.getProductName(p.stock_Item_ID), 'R' + p.payment_Amount, 
                  p.sale_Quantity, p.sale_Date
                ])
              )
            ]
          }          
        }
      ]      
    };  
    pdfMake.createPdf(docDefinition).download();      
  }

  AddToBestSeller(stockitemid: string){
    let stockitem = new Best_Sellers()
    stockitem.stock_Item_ID = stockitemid
    console.log(stockitem)

    this.bestsellerservice.AddBestSeller(stockitem).subscribe(result => {
      console.log(result)
      // this.AddSuccessAlert();
    },(error) => {
      // this.AddErrorAlert()        
      console.error('AddToBestSellers error:', error);
    })
  }

//========= Navigations =========
  prodReportNav()
  {
    this.router.navigate(['./tabs/product-trends']);
  }

  RefundsRoute()
  {
    this.router.navigate(['./tabs/refunds']);
  }

  RefundPolicyRoute()
  {
    this.router.navigate(['./tabs/refund-policies']);
  }

  bestellersnav()
  {
    this.router.navigate(['./tabs/best-sellers']);
  }
  

}
