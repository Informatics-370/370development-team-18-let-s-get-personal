import { Component, OnInit, ViewChild, EnvironmentInjector, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Delivery_Company } from '../Models/deliverycompany';
import { AlertController, IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { DeliveryDataService } from '../Services/deliveries.service';
import { DeliveryViewModel } from '../ViewModels/deliveryVM';
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { AuditTrailService } from '../Services/audittrail.service';
import { AuditTrail } from '../Models/adittrail';
import { OrderService } from '../Services/order.service';
import { OrderLineItemVM } from '../ViewModels/orderlineitemVM';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts"; 
import { Order } from '../Models/orders';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.page.html',
  styleUrls: ['./deliveries.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class DeliveriesPage implements OnInit {
  
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
    public orderservice: OrderService, private trailservice: AuditTrailService) 
  {
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }
  
  Routedeliverycompanies()
  {
    this.router.navigate(['./tabs/delivery-companies']);
  }

  RoutePrevDeliveries()
  {
    this.router.navigate(['./tabs/successful-deliveries']);
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

  stockItemID: any
  customerID: any
  qauntity: any

  ReceiveDelivery(DeliveryId: string, order_Line_Item_ID:string, stockItemID: string, customerID: string, qauntity: number){
    try
    {
      this.stockItemID = stockItemID
      this.customerID = customerID
      this.qauntity = qauntity
      localStorage.setItem('order_Line_Item_ID', JSON.stringify(order_Line_Item_ID));
      this.service.ChangeStatusToRecieved(DeliveryId).subscribe(result =>{
        if(result.status == "Success"){
          console.log(result);          
        }
      }) 
      this.getOrder()
    }
    catch{
      this.ReceiveDeliveryErrorAlert
    }
  }

  FailedDelivery(DeliveryId: string, order_Line_Item_ID:string, stockItemID: string, customerID: string, qauntity: number){
    try{
      this.stockItemID = stockItemID
      this.customerID = customerID
      this.qauntity = qauntity
      localStorage.setItem('order_Line_Item_ID', JSON.stringify(order_Line_Item_ID));

      this.service.ChangeStatusToFailed(DeliveryId).subscribe(result =>{
        if(result.status == "Success"){
          console.log(result);          
        }
      })
      this.getOrder()
    }
    catch{
      this.ReceiveDeliveryErrorAlert
    }
  }

  orderlineitem: OrderLineItemVM = new OrderLineItemVM()
  getOrder(){
    try
    {
      let order_Line_Item_ID = JSON.parse(localStorage.getItem('order_Line_Item_ID') as string)
      console.log(order_Line_Item_ID);
      this.orderservice.GetOrderByID(order_Line_Item_ID).subscribe(result =>{        
        this.orderlineitem = result as OrderLineItemVM
        console.log(this.orderlineitem);

        let customer = this.orderlineitem.customer_ID
        localStorage.setItem('customer', JSON.stringify(customer));
        console.log(customer);
        this.addToOrder(); 
      })        
    }
    catch{
      this.AddOrderErrorAlert()
    }    
  }

  addToOrder(){    
    try
    {
      let order = new Order;
      console.log(this.orderlineitem.customer_ID)
        order.customer_ID = this.customerID
        order.order_Quantity = this.qauntity
        order.stock_Item_ID = this.stockItemID
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
    //delete from orderline 
    try
    {
      let order_Line_Item_ID = JSON.parse(localStorage.getItem('order_Line_Item_ID') as string)
      this.orderservice.ProcessOrder(order_Line_Item_ID).subscribe(result =>{
        console.log(result)
      })
      this.ReceiveDeliverySuccessAlert()
      
      this.action = "Changed Delivery status to Received" 
      this.AddTrail()
    }
    catch
    {
      this.DeleteOrderLineItemErrorAlert()
    }
    
  }

  //=========== Audit trail ===========
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

  reloadPage(){
    window.location.reload()
  }

  openPDF(){
    let user = JSON.parse(JSON.stringify(localStorage.getItem('username')))
    let date = new Date
    
    let docDefinition = {  
      fillColor: "White",
      fillOpacity: "",
      margin: [ 5, 10, 5, 5 ],
      header: user+" - It's Personal Audit Trail",  
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
              [ 
                'Customer Username', 'Street Number', 'Street Name', 'City', 'Province', 'Area Code', 
                'Delivery Company', 'Delivery Price', 'Order Requested Date'
              ],
              ...this.deliveries.map(p => 
                ([
                  p.customer_UserName, p.streetNumber, p.streetName, p.city, p.province, p.areaCode, 
                  p.delivery_Company_Name, p.delivery_Price, p.order_Request_Date
                ])),
            ]
          }          
        }
      ]      
    };  
    pdfMake.createPdf(docDefinition).download(); 
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
