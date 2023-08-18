import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BasketItems, OrderT } from 'src/app/Models/basket';
import { DeliveryAddress } from 'src/app/Models/deliveryaddress';
import { OrderService } from 'src/app/Services/order.service';
import { OrderRequestService } from 'src/app/Services/orderrequest.service';
import { DeliveryVM } from 'src/app/ViewModels/deliveryVM';
import { Order_Request } from 'src/app/Models/orderrequest';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.page.html',
  styleUrls: ['./check-out.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CheckOutPage implements OnInit {

  order = new OrderT();
  basketItems: BasketItems[] = [];
  address:DeliveryAddress= new DeliveryAddress();
  deliveryvm: any;
  delprice!: number;
  totalprice: number = 0
  orderrequest!: Order_Request
  constructor(public service: OrderRequestService) { }

  ngOnInit() {
    this.order = JSON.parse(localStorage.getItem('order') as string)

    this.basketItems=this.order.basketItems;
    console.log(this.basketItems);  
  
    this.GetOrderDetails()
  }

  GetOrderDetails(){    
    try
    {
      let delID = JSON.parse(localStorage.getItem('deliveryID') as string)
      this.service.GetDeliveryByID(delID).subscribe(result =>{
      this.deliveryvm = result as DeliveryVM[];
      console.log(this.deliveryvm)
      this.delprice = this.deliveryvm.delivery_Price
      console.log(this.delprice)
    })
      
      this.culculate()
    }
    catch{
      //this.culculate()
    }
  }

  culculate(){
    let orderprice = this.order.price
    this.totalprice = orderprice + 100
    console.log(this.totalprice)
    localStorage.setItem('totalprice', JSON.stringify(this.totalprice));
  }

  AddOrderRequest(){
    try
    {
      let addorderRequest = new Order_Request();
      let delID = JSON.parse(localStorage.getItem('deliveryID') as string)
      let customerID = JSON.parse(localStorage.getItem('customerID') as string)
      let ortprice = this.totalprice 

      addorderRequest.delivery_ID = delID
      addorderRequest.customer_ID = customerID      
      addorderRequest.order_Request_Total_Price = ortprice

      this.service.AddOrderRequest(addorderRequest).subscribe(result => {
        this.orderrequest = result as Order_Request
        let orderRequestID = this.orderrequest.order_Request_ID
        localStorage.setItem('orderRequestID', JSON.stringify(orderRequestID));
      })
      this.proceedToPayFast()
    }
    catch
    {

    }
    
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

}
