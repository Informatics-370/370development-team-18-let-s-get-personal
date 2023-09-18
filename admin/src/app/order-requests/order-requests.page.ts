import { Component, OnInit, EnvironmentInjector, ViewChild, ElementRef  } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../Services/order.service';
import { OrderLineItemVM } from '../ViewModels/orderlineitemVM';
import { AuditTrailService } from '../Services/audittrail.service';
import { AuditTrail } from '../Models/adittrail';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { LoadingController } from '@ionic/angular';
export type jsPDFDocument = any;
type Opts = { [key: string]: string | number }

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
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
  constructor(public service: OrderService, public environmentInjector: EnvironmentInjector,
     private alertController:AlertController, public loadingController: LoadingController,
     private trailservice: AuditTrailService ) 
  { 
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit() {
    this.GetOrderRequests()
  }

  GetOrderRequests(){
    this.presentLoading()
    this.service.GetRequestedOrders().subscribe(result =>{
      this.orderRequests = result as OrderLineItemVM[]
      var date = result.order_Request_Date
      console.log(this.orderRequests)
    })
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Click the backdrop to dismiss early...',
      duration: 2000,
      backdropDismiss: true,
    });
    
    await loading.present();
  
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  } 

  AcceptOrder(order_Line_Item_ID: string){
    try
    {
      this.service.AcceptOrder(order_Line_Item_ID).subscribe(res =>{
        
      })
      this.AcceptSuccessAlert()
      this.AddTrail()
    }
    catch
    {
      this.AcceptErrorAlert()
    }
    
  }

//====== PDF download =========

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
          //widths: [ '30%', '40%', '30%' ],
          // margin: [left, top, right, bottom]
          margin: [ 5, 10, 5, 5 ],
          
          body: [
            [ 'Customer Username', 'Street Number', 'Street Name', 'Delivery Company', 'Product', 
            'Order Quantity', 'Product Size', 'Product Colour', 'Order Request Date' ],
            ...this.orderRequests.map(p => 
              ([
                p.customer_UserName, p.streetNumber, p.streetName, p.delivery_Company_Name, 
                p.stock_Item_Name, p.order_Line_Item_Quantity, p.stock_Item_Size,
                p.stock_Colour_Name, p.order_Request_Date
              ])
            )
          ]
        }          
      }
    ]      
  };  
  pdfMake.createPdf(docDefinition).download();      
}

//====== Audit Trail =========
  AddTrail(){
    let audittrail = new AuditTrail()
    let roles = JSON.parse(JSON.stringify(localStorage.getItem('roles'))); //userID
    let userID = JSON.parse(JSON.stringify(localStorage.getItem('userID'))) //JSON.parse(localStorage.getItem('userID') as string)
    let action = "Added order to 'In Progress'"
    
    if(roles == "Admin"){
      audittrail.admin_ID = userID
      audittrail.actionName = action
      this.trailservice.AddAdminAuditTrailItem(audittrail).subscribe(result =>{
        console.log(result)
      })
    }
    else{
      audittrail.employee_ID = userID
      audittrail.actionName = action
      this.trailservice.AddEmployeeAuditTrail(audittrail).subscribe(result =>{
        console.log(result)
      })
    }
  }


//====== Alerts =========
  async AcceptSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      // subHeader: 'Item Added To Best Seller List',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          this.reloadPage();
        }
      }],
    });
    await alert.present();
  }

  async AcceptErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      // subHeader: 'Item Was Not Added',
      message: 'Please try again',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          this.reloadPage();
        }
      }],
    });
    await alert.present();
  }

  reloadPage() {
    window.location.reload()
  }

}

// @ViewChild('htmlOrderRequestData') htmlOrderRequestData!: ElementRef;
  
// openPDF(): void {
//   let DATA: any = document.getElementById('htmlOrderRequestData');
//   html2canvas(DATA).then((canvas) => {       
//     //Initialize JSPDF
//     let PDF = new jsPDF('p', 'mm', 'a4');
//     //Converting canvas to Image
//     const FILEURI = canvas.toDataURL('image/png');
//     //Add image Canvas to PDF
//     let fileWidth = 208;
//     let fileHeight = (canvas.height * fileWidth) / canvas.width;      
//     let position = 10;
//     PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);        
        
//     PDF.save('IPKP-OrderRequests.pdf');
//   });
// }