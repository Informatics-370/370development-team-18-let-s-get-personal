import { Component, OnInit, ViewChild, EnvironmentInjector, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Delivery_Company } from '../Models/deliverycompany';
import { AlertController, IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DeliveryDataService } from '../Services/deliveries.service';
import { DeliveryViewModel } from '../ViewModels/deliveryVM';
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { OrderService } from '../Services/order.service';
import { OrderLineItemVM } from '../ViewModels/orderlineitemVM';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Order } from '../Models/orders';
export type jsPDFDocument = any;
type Opts = { [key: string]: string | number }

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.page.html',
  styleUrls: ['./deliveries.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule,RouterModule]
})
export class DeliveriesPage implements OnInit {
  private readonly jsPDFDocument: jsPDFDocument
  searchValue: string ='';
  deliveries:OrderLineItemVM[]=[];
  filteredDelivery:DeliveryViewModel[]=[];
  deliverycompanies:Delivery_Company[]=[];

  updateSearchResults() {
    // this.filteredDelivery = this.deliveries.filter((items: { Tracking_Number: number; }) =>
    //  items.Tracking_Number.toString().includes(this.searchValue));
  }

  ngOnInit() {
    this.GetRequestedDeliveries();
    this.getDeliveryCompany();
  }

  @ViewChild(IonModal) modal!: IonModal
  constructor(private service:DeliveryDataService, private router: Router, public modalCtrl: ModalController,
    private alertController:AlertController, public environmentInjector: EnvironmentInjector, 
    public orderservice: OrderService,) { }
  
  Routedeliverycompanies()
  {
    this.router.navigate(['./tabs/delivery-companies']);
  }

  GetRequestedDeliveries(){
    this.service.GetOutDeliveries().subscribe(res => {
      this.deliveries = res as OrderLineItemVM[]
      console.log(this.deliveries)
    })
  }

  getDeliveryCompany(){
    this.service.GetDeliveryCompanies().subscribe(result =>{
      this.deliverycompanies = result as Delivery_Company[];
      console.log(this.deliverycompanies)
    })
  }


  ReceiveDelivery(DeliveryId: string, order_Line_Item_ID:string){
    try
    {
      localStorage.setItem('order_Line_Item_ID', JSON.stringify(order_Line_Item_ID));
      this.service.ChangeStatusToRecieved(DeliveryId).subscribe(result =>{
        if(result.status == "Success"){
          console.log(result);
          
        }
      }) 
      this.addToOrder(); 
    }
    catch{
      this.ReceiveDeliveryErrorAlert
    }
  }

  orderlineitem: OrderLineItemVM = new OrderLineItemVM();

  addToOrder(){
    let order_Line_Item_ID = JSON.parse(localStorage.getItem('order_Line_Item_ID') as string)
    try{
      this.orderservice.GetOrderByID(order_Line_Item_ID).subscribe(result =>{
        console.log(result);
        this.orderlineitem = result as OrderLineItemVM;
      })  

      let order = new Order();
        order.customer_ID = this.orderlineitem.customer_ID
        order.order_Quantity = this.orderlineitem.order_Line_Item_Quantity
        order.stock_Item_ID = this.orderlineitem.stock_Item_ID
        this.orderservice.AddOrder(order).subscribe(response => {
          if(response.status == "Success")
          {
            console.log(response);
            this.proccessOrder();
          }
          else
          {
            this.AddOrderErrorAlert()
          }
      })
    }
    catch{
      this.AddOrderErrorAlert()
    }    
  }

  proccessOrder(){
    try
    {
      let order_Line_Item_ID = JSON.parse(localStorage.getItem('order_Line_Item_ID') as string)
      this.orderservice.ProcessOrder(order_Line_Item_ID).subscribe(result =>{
        console.log(result)
      })
    }
    catch
    {
      this.DeleteOrderLineItemErrorAlert()
    }
    
  }

  reloadPage(){
    window.location.reload()
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
          
      PDF.save('IPKP-DeliveriesInProgress.pdf');
    });
  }

  async ReceiveDeliverySuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Delivery Received',
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

  async ReceiveDeliveryErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Delivery Status Was Not Successfully Updated',
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

  async AddOrderErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Order was not added to Successful Orders',
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

  async DeleteOrderLineItemErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Order was not removed from Orders In Progress',
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

  
}
