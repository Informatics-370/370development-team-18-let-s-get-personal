import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { SalesService } from 'src/app/Services/sales.service';
import { OrderService } from 'src/app/Services/order.service';
import { BasketItems, OrderT } from 'src/app/Models/basket';
import { Order_Line_Item } from 'src/app/Models/orderlineitem';
import { Payment } from 'src/app/Models/payment';

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
  basket = new BasketItems();
  constructor(private router:Router, private orderService:OrderService, private saleService: SalesService) { }

  ngOnInit() {
    this.order = JSON.parse(localStorage.getItem('order') as string)
    this.order.paid=true;
    this.cartitems = JSON.parse(localStorage.getItem('cart') as string)
    this.AddOrderLineItem()
  }

  AddOrderLineItem(){
    try
    {
      let addedOrder = new Order_Line_Item
      let orderRequestID = JSON.parse(localStorage.getItem('orderRequestID') as string)
      let personalisedID = JSON.parse(localStorage.getItem('personalisedID') as string)
      let quantity = JSON.parse(localStorage.getItem('quantity') as string) //this.basket.basket_Quantity
      let price = JSON.parse(localStorage.getItem('totalprice') as string)

      addedOrder.order_Line_Item_Price = price
      addedOrder.order_Line_Item_Quantity = quantity
      addedOrder.order_request_ID = orderRequestID
      addedOrder.personalisation_ID = personalisedID

      this.orderService.AddOrderLineItem(addedOrder).subscribe(result => {
        console.log(result)
      })

      this.addSale()      
    }
    catch
    {
      /// ============== Error alert
    }
  }

  addSale(){
    
    let addedSale = new Payment();
    let price = JSON.parse(localStorage.getItem('totalprice') as string)
    let username = JSON.parse(JSON.stringify(localStorage.getItem('username')))
    let quantity = JSON.parse(localStorage.getItem('quantity') as string)
    let stockitem = JSON.parse(JSON.stringify(localStorage.getItem('stockId')));

    addedSale.payment_Amount = price
    addedSale.customer_UserName = username
    addedSale.sale_Quantity = quantity
    addedSale.stock_Item_ID = stockitem

    try{

      this.saleService.AddSale(addedSale).subscribe(result =>{
        console.log(result)
      })

      this.placeOrder(this.order);
    }
    catch{

    }
  }

  private placeOrder(order:OrderT):void{
      localStorage.removeItem("order");
      localStorage.removeItem("cart");
      localStorage.removeItem("orderRequestID");
      localStorage.removeItem("personalisedID");
      localStorage.removeItem("totalprice");
      localStorage.removeItem("deliveryID");
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
