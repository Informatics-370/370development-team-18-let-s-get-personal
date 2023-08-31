import { Component, OnInit, EnvironmentInjector, ViewChild, ElementRef  } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../Services/order.service';
import { OrderLineItemVM } from '../ViewModels/orderlineitemVM';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { LoadingController } from '@ionic/angular';
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
  constructor(public service: OrderService, public environmentInjector: EnvironmentInjector,
     private alertController:AlertController, public loadingController: LoadingController ) { }

  ngOnInit() {
    this.GetOrderRequests()
  }

  GetOrderRequests(){
    this.presentLoading()
    this.service.GetRequestedOrders().subscribe(result =>{
      this.orderRequests = result as OrderLineItemVM[]
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
    }
    catch
    {
      this.AcceptErrorAlert()
    }
    
  }

  DeclineOrder(order_Line_Item_ID: string){

  }

  @ViewChild('htmlOrderRequestData') htmlOrderRequestData!: ElementRef;
  
  openPDF(): void {
    let DATA: any = document.getElementById('htmlOrderRequestData');
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
