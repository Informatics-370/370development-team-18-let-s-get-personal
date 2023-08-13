import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController,AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Stock_Item } from '../Models/stockitem';
import { BasketItems } from '../Models/basket';
import { Subject } from 'rxjs';
import { BasketService } from '../Services/basket.service';
import { StockItemDataService } from '../Services/stockitem.service';
import { BestsellersService } from 'src/app/Services/bestsellers.service';

import { StockItemViewModel } from 'src/app/ViewModels/stockitemsVM';
@Component({
  selector: 'app-shop-all',
  templateUrl: './shop-all.page.html',
  styleUrls: ['./shop-all.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ShopAllPage implements OnInit {
  menuType: string = 'overlay';
  Products: StockItemViewModel[] = [];
  stockItems: Stock_Item[] = [];

  constructor(private _modalController: ModalController,
     private _router: Router, private alertController:AlertController,
     private basketservice:BasketService,
     private service:StockItemDataService) { }

     //Data for testing
     /* dummy_data = [{
      id: 0, title: "Plain T-shirt", colour: "White",
      image_url: "https://supremetextiles.co.za/761-large_default/adult-plain-round-neck-t-shirt-white.jpg", price: 90,
      quantity: 0
    },
    {
      id: 1, title: "Photo Mug", colour: "White",
      image_url: "https://smash-images.photobox.com/optimised/f10581d7b173933f6b5670a7191ef11caad09a4e_file_image_Simple-mug-lifestyle-5760x4512.jpg", price: 160,
      quantity: 0
    },
    {
      id: 2, title: "Diary", colour: "Brown",
      image_url: "https://cdn.igp.com/f_auto,q_auto,t_pnopt6prodlp/products/p-stationery-addict-personalized-stationery-kit-122187-m.jpg", price: 120,
      quantity: 0
    },
    {
      id: 3, title: "Twin Babies", colour: "Dusty White",
      image_url: "https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/Search/676/K62163.jpg", price: 350,
      quantity: 0
    }
    ];*/

  ngOnInit() {
    this.GetStockItems();
  }

  public GetStockItems(){
    this.service.GetStockItems().subscribe(result =>{
      this.Products = result as StockItemViewModel[];
      console.log(this.stockItems)
    })
  }

  public clothing() {
    this._router.navigate(["/tabs/clothing"])
  }
  public drinking() {
    this._router.navigate(["/tabs/drinking"])
  }
  public stationary() {
    this._router.navigate(["/tabs/stationary"])
  }

  public Basket() {
    this._router.navigate(["/tabs/basket"])
  }

  /*addToBasket(dummy_data:any):void{

    let cartItems = JSON.parse(localStorage.getItem('cart') as string) || [];
    let existingItem = cartItems.find((cartItem:any) => cartItem.id === dummy_data.id);

    if (!existingItem) {
      cartItems.push({ ...dummy_data, quantity: 1 });
    } else {
      
      existingItem.quantity += 1;
    }
    localStorage.setItem('cart',JSON.stringify(cartItems));
    this.addToBasketSuccessAlert();
  }*/

  addToBasket(stockItems:any):void{

    let cartItems = JSON.parse(localStorage.getItem('cart') as string) || [];
    let existingItem = cartItems.find((cartItem:any) => cartItem.id === stockItems.stock_Item_ID);

    if (!existingItem) {
      cartItems.push({ ...stockItems, basket_Quantity: 1 });
    } else {
      
      existingItem.basket_Quantity += 1;
    }
    localStorage.setItem('cart',JSON.stringify(cartItems));
    this.addToBasketSuccessAlert();
  }

  reloadPage(){
    window.location.reload()
  }

  
  async addToBasketSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Added to basket.',
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
  async addToBasketErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Item Was Not Added',
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
  
  /* addToBasket(stockItem: Stock_Item, newQuantity: number){
    this.basketservice.addProductToBasket(stockItem,newQuantity);
    this.addToBasketSuccessAlert();
  }*/
}
