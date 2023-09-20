import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { BasketItems, OrderT } from 'src/app/Models/basket';
import { DeliveryAddress } from 'src/app/Models/deliveryaddress';
import { OrderService } from 'src/app/Services/order.service';
import { OrderRequestService } from 'src/app/Services/orderrequest.service';
import { DeliveryVM } from 'src/app/ViewModels/deliveryVM';
import { Order_Request } from 'src/app/Models/orderrequest';
import { Delivery } from 'src/app/Models/delivery';
import { AuditTrail } from 'src/app/Models/audittrail';
import { AuditTrailService } from 'src/app/Services/audittrail.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.page.html',
  styleUrls: ['./check-out.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CheckOutPage implements OnInit {
  discount!: number
  order = new OrderT();
  basketItems: BasketItems[] = [];
  address:DeliveryAddress= new DeliveryAddress();
  deliveryvm: DeliveryVM[] = [];
  delprice: number = 0;
  totalprice: number = 0
  orderrequest!: Order_Request
  constructor(public service: OrderRequestService, private auditservice: AuditTrailService, private router: Router,
    private alertController:AlertController) { }

  ngOnInit() {
    this.order = JSON.parse(localStorage.getItem('order') as string)
    this.discount = JSON.parse(JSON.stringify(localStorage.getItem('discount')))
    this.basketItems=this.order.basketItems;
    console.log(this.basketItems);  
  
    this.GetOrderDetails()
  }

  GetOrderDetails(){    
    try
    {
      let delID = JSON.parse(JSON.stringify(localStorage.getItem('deliveryID'))) // JSON.parse(localStorage.getItem('deliveryID') as string)
      this.service.GetDeliveryByID(delID).subscribe(result =>{
        this.deliveryvm = result as DeliveryVM[];
          console.log(this.deliveryvm)
          this.deliveryvm.forEach(element => {
            //let amount = element.delivery_Price 
            this.delprice += element.delivery_Price
          });
          localStorage.setItem('delprice', JSON.stringify(this.delprice));
          console.log(this.delprice)
      })
      
    }
    catch{
      //Error alert
    }
    
    this.culculate()
  }

  culculate(){
    let orderprice = this.order.price
    this.totalprice = orderprice + this.delprice
    console.log(this.totalprice)
    localStorage.setItem('totalprice', JSON.stringify(this.totalprice));
  }

  AddOrderRequest(){
    // try
    // {
      let addorderRequest = new Order_Request();
      let delID = JSON.parse(JSON.stringify(localStorage.getItem('deliveryID'))) //JSON.parse(localStorage.getItem('deliveryID') as string)
      let customerID = JSON.parse(JSON.stringify(localStorage.getItem('customerID'))) //JSON.parse(localStorage.getItem('customerID') as string)

      let ortprice = this.totalprice 

      addorderRequest.delivery_ID = delID
      addorderRequest.customer_ID = customerID      
      addorderRequest.order_Request_Total_Price = ortprice

      this.service.AddOrderRequest(addorderRequest).subscribe(result => {
        this.orderrequest = result as Order_Request
        console.log(this.orderrequest)
        let orderRequestID = this.orderrequest.order_Request_ID
        localStorage.setItem('orderRequestID', JSON.stringify(orderRequestID));
      })

      //Action Trail
      this.action = "Confirmed Order Details"
      this.AddAuditTrail()


      this.proceedToPayFast()
    // }
    // catch
    // {

    // }
    
  } 

//========= Audit Trail ========
  action!: string
  AddAuditTrail(){
    let customer_ID = JSON.parse(JSON.stringify(localStorage.getItem('customerID')))
    let audittrail = new AuditTrail()
    audittrail.customer_ID = customer_ID
    audittrail.actionName = this.action

    this.auditservice.AddCustomerAuditTrail(audittrail).subscribe(result => {
      console.log(result)
    })
  }

  proceedToPayFast() {
    const merchantId = '10030633';
    const merchantKey = 'azvaw7rrloy1e';
    const returnUrl = 'http://localhost:8100/tabs/successful-payment';
    const totalPrice = this.totalprice 

    const itemNamesList = "Order"+new Date();
  
    const payFastUrl = `https://sandbox.payfast.co.za/eng/process?merchant_id=${merchantId}&merchant_key=${merchantKey}&return_url=${returnUrl}&amount=${totalPrice}&item_name=${itemNamesList}`;
  
    // Redirect the user to the PayFast sandbox
    window.location.href = payFastUrl;
  }

  async CheckOutTip() {
    const alert = await this.alertController.create({
      header: 'Please note: ',
      subHeader: 'We are currently only accepting Payfast payments. This is to keep your information as secure as possible.',
      message:'If you are have any issues or questions please contact us on our contact us page.',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        // handler: () => {
        //   this.reloadPage();
        // }
      },{
        text: 'Contact Us',
        //role: 'cancel',
        handler: () => {
          this.ContactUs();
        }
      }],
    });
    await alert.present();
  }

  public ContactUs() {
    this.router.navigate(["/tabs/contact-us"])
  }

}
