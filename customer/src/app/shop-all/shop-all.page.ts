import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Stock_Item } from '../Models/stockitem';
import { BasketItems } from '../Models/basket';
import { LoadingController } from '@ionic/angular';
import { BasketService } from '../Services/basket.service';
import { StockItemDataService } from '../Services/stockitem.service';
import { BestsellersService } from 'src/app/Services/bestsellers.service';

import { StockItemViewModel } from 'src/app/ViewModels/stockitemsVM';
import { StockTypes } from '../Models/stocktypes';
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
  searchedStockType: StockTypes[]=[];
  searchString: string = "";
  stockType: StockTypes[]=[];

  counter=document.querySelector("#counter"); 

  constructor(private _modalController: ModalController, public loadingController: LoadingController,
    private _router: Router, private alertController: AlertController,
    private basketservice: BasketService, private service: StockItemDataService) { }

    SearchForm: FormGroup = new FormGroup({
      name:new FormControl('',[Validators.required])
    })
    
    searchStockType(){
      this.searchString=this.SearchForm.get('name')?.value;
      this.searchedStockType = this.stockType.filter(
        f => f.stock_Type_Name.toLowerCase().includes(this.searchString.toLowerCase()));
    }
  ngOnInit() {
    this.GetStockItems();
    if(this.searchString === "")
    {
      this.searchedStockType = this.stockType;
    }
    // Retrieve the cart item count from localStorage
  const cartItemCount = localStorage.getItem('cartItemCount');
  if (cartItemCount) {
    if (this.counter) {
      this.counter.innerHTML = cartItemCount;
    }
  }
   
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000,
    });
    
    await loading.present();
  
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  public GetStockItems() {
    this.service.GetStockItems().subscribe(result => {
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

  /*public Basket() {
    this._router.navigate(["/tabs/basket"])
  }*/
  public Help() {
    this._router.navigate(["/help"])
  }
  
  
  public addToBasket(stock: any): void {

    try {
      let cartItems = JSON.parse(localStorage.getItem('cart') as string) || [];
      let existingItem = cartItems.find((cartItem: any) => cartItem.stock_Item.stock_Item_ID === stock.stock_Item_ID);

      let basket = new BasketItems();
      if (!existingItem) {
        basket.stock_Item = stock;
        basket.basket_Quantity = 1;
        cartItems.push(basket);
      } else {
        existingItem.basket_Quantity += 1;
      }
      localStorage.setItem('cart', JSON.stringify(cartItems));
      // Update the counter span
    this.updateCounterSpan(cartItems);
    

    this.addToBasketSuccessAlert();
    

    } catch {
      this.addToBasketErrorAlert();
    }
    
  }

  private updateCounterSpan(cartItems: any[]): void {
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.basket_Quantity, 0);
    if (this.counter) {
      this.counter.innerHTML = totalQuantity.toString();
    }
    // Call the method to update the cart item count in localStorage
    this.storeCartItemCountInLocalStorage(cartItems);
  }
  private storeCartItemCountInLocalStorage(cartItems: any[]): void {
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.basket_Quantity, 0);
    localStorage.setItem('cartItemCount', totalQuantity.toString());
  }

  reloadPage() {
    window.location.reload()
  }

  async addToBasketSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Added to basket.',
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
  async addToBasketErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Item Was Not Added',
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
}

  /*addToBasket(Products:any):void{

    let cartItems = JSON.parse(localStorage.getItem('cart') as string) || [];
    let existingItem = cartItems.find((cartItem:any) => cartItem.stock_Item_ID === Products.stock_Item_ID);

    if (!existingItem) {
      cartItems.push({ ...Products, stock_Item_Quantity: 1 });
    } else {
      
      existingItem.stock_Item_Quantity += 1;
    }
    localStorage.setItem('cart',JSON.stringify(cartItems));
    this.addToBasketSuccessAlert();
  }*/