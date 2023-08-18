import { Component, OnInit, EnvironmentInjector, ViewChild, ElementRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderService } from '../Services/order.service';
import { OrderLineItemVM } from '../ViewModels/orderlineitemVM';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export type jsPDFDocument = any;
type Opts = { [key: string]: string | number }
@Component({
  selector: 'app-order-requests',
  templateUrl: './order-requests.page.html',
  styleUrls: ['./order-requests.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OrderRequestsPage implements OnInit {
  private readonly jsPDFDocument: jsPDFDocument
  orderRequests: OrderLineItemVM[] =[]
  constructor(public service: OrderService) { }

  ngOnInit() {
    this.GetOrderRequests()
  }

  GetOrderRequests(){
    this.service.GetRequestedOrders().subscribe(result =>{
      this.orderRequests = result as OrderLineItemVM[]
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
          
      PDF.save('IPKP-OrderRequests.pdf');
    });
  }

}
