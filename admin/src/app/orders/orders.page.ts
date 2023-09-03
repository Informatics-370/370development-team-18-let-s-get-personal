import { Component, OnInit, EnvironmentInjector, ViewChild, ElementRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { OrderService } from '../Services/order.service';
import { OrderLineItemVM } from '../ViewModels/orderlineitemVM';
import { LoadingController } from '@ionic/angular'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export type jsPDFDocument = any;
type Opts = { [key: string]: string | number }
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OrdersPage implements OnInit {
  orderRequests: OrderLineItemVM[] =[]
  constructor(private router: Router, public service: OrderService, private alertController:AlertController,
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.GetOrdersInProgress()
  }

  GetOrdersInProgress(){
    this.presentLoading()
    this.service.GetOrdersInProgress().subscribe(result =>{
      this.orderRequests = result as OrderLineItemVM[]
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

  
  OutForDelivery(order_Line_Item_ID: string){
    try
    {
      this.service.SendOutDelivery(order_Line_Item_ID).subscribe(result =>{
        this.AcceptSuccessAlert()
      })    
    }
    catch
    {
      this.AcceptErrorAlert()
    }
    
  }

  prevOrders()
  {
    this.router.navigate(['./tabs/sales']);
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
