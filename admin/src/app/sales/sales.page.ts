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
import { StockItemDataService } from 'src/app/Services/stockitem.service';
import { SalesVM } from '../ViewModels/salesVM';
import { StockTypeDataService } from '../Services/stocktype.service';
import { StockTypes } from '../Models/stocktypes';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class SalesPage implements OnInit {
  private readonly jsPDFDocument: jsPDFDocument
  sales: Payment[] =[]
  constructor(private service: SalesService, private router: Router, public stockitemservice: StockItemDataService,
    public environmentInjector: EnvironmentInjector, private typeservice: StockTypeDataService) { }  

  ngOnInit(): void {    
    this.GetStockTypes()
  }

  GetSalesList()
  {
    this.service.GetAllSales().subscribe(res => {
      this.sales = res as Payment[]
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

  Products: StockItemViewModel[] = [];
  GetAllStockItems(){
    this.stockitemservice.GetStockItems().subscribe(result =>{

    this.Products = result as StockItemViewModel[];
      this.Products.forEach(e => {
        this.stocktypename = e.stockTypeName
        this.GetControlBreak(this.stocktypename)
      });
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
