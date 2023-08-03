import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BasketItems } from '../Models/basket';
import { Delivery_Company } from '../Models/deliverycompany';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BasketPage implements OnInit {

  constructor(private _modalController:ModalController,private _router:Router) { }


  basketItems: BasketItems[] = [];
  deliverycompany:Delivery_Company[]=[];

  ngOnInit() {
    this.basketItems = JSON.parse(localStorage.getItem('cart') as string) || [];
  }

  ionViewWillEnter() {
    this.basketItems = JSON.parse(localStorage.getItem('cart') as string) || [];
  }

  public removeFromBasket(item: any):void {
    this.basketItems = this.basketItems.filter((basketItem) => basketItem.stock_Item.stock_Item_ID !== item.id);
    localStorage.setItem('cart', JSON.stringify(this.basketItems));
  }

  public incrementQuantity(item: any):void {
    item.quantity++;
    localStorage.setItem('cart', JSON.stringify(this.basketItems));
  }

  public decrementQuantity(item: any):void {
    if (item.quantity > 1) {
      item.quantity--;
    }
    localStorage.setItem('cart', JSON.stringify(this.basketItems));
  }

  /*public calculateTotalPrice():any {
    let totalPrice = 0;
    for (const item of this.basketItems) {
      totalPrice += item.basket_Price * item.basket_Quantity;
    }
    return totalPrice;
  }*/

  //not the final code, just reference

  public  makepayment(){
    
    let pastOrders = JSON.parse(localStorage.getItem('pastorders') as string) || [];
    pastOrders.push({
      items: this.basketItems,
      date: new Date()
    });
    localStorage.removeItem('cart')
    localStorage.setItem('pastorders', JSON.stringify(pastOrders));

    //alert("You have paid R"+price+this.deliveryFee)

    this._router.navigate(["/tabs/make-payment"])
  }

}
