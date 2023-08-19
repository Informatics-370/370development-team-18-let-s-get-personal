import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrderT } from 'src/app/Models/basket';
import { OrderService } from 'src/app/Services/order.service';
import { Order_Line_Item } from 'src/app/Models/orderlineitem';

@Component({
  selector: 'app-successful-payment',
  templateUrl: './successful-payment.page.html',
  styleUrls: ['./successful-payment.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SuccessfulPaymentPage implements OnInit {
  showAnimation = false;
  order = new OrderT();
  cartitems: any 
  constructor(private router:Router,private orderService:OrderService) { }

  ngOnInit() {
    this.order = JSON.parse(localStorage.getItem('order') as string)
    this.cartitems = JSON.parse(localStorage.getItem('cart') as string)//localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.order.paid=true;   
    this.AddOrderLineItem()
  }

  AddOrderLineItem(){
    try
    {
      let addedOrder = new Order_Line_Item
      let orderRequestID = JSON.parse(localStorage.getItem('orderRequestID') as string)
      let personalisedID = JSON.parse(localStorage.getItem('personalisedID') as string)
      let quantity = this.cartitems.basket_Quantity
      let price = JSON.parse(localStorage.getItem('totalprice') as string)

      addedOrder.order_Line_Item_Price = price
      addedOrder.order_Line_Item_Quantity = quantity
      addedOrder.order_request_ID = orderRequestID
      addedOrder.personalisation_ID = personalisedID

      this.orderService.AddOrderLineItem(addedOrder).subscribe(result => {

      })

      this.placeOrder(this.order);
    }
    catch
    {

    }
  }

  private placeOrder(order:OrderT):void{
    //this.orderService.placeOrder(order).subscribe(res=>{
      localStorage.removeItem("order");
      localStorage.removeItem("cart");
      localStorage.removeItem("orderRequestID");
      localStorage.removeItem("personalisedID");
      localStorage.removeItem("totalprice");
      localStorage.removeItem("deliveryID");
      //console.log(res);
    // },err=>{
    //   console.log(err);
    //   localStorage.removeItem("order");
    //   localStorage.removeItem("cart"); 
    // })
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.showAnimation = true;
    }, 1000);
  }

  redirectToShopping() {
    this.router.navigate(['/']); // Replace 'shopping' with your shopping page route
  }

}
