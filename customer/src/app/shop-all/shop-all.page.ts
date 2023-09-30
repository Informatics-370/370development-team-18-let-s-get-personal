import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Stock_Item } from '../Models/stockitem';
import { BasketItems } from '../Models/basket';
import { LoadingController } from '@ionic/angular';
import { BasketService } from '../Services/basket.service';
import { StockItemDataService } from '../Services/stockitem.service';
import { BestsellersService } from 'src/app/Services/bestsellers.service';
import { StockTypeDataService } from '../Services/stocktype.service';
import { StockItemViewModel } from 'src/app/ViewModels/stockitemsVM';
import { StockTypes } from '../Models/stocktypes';
import { Best_Sellers } from '../Models/bestsellers';
@Component({
  selector: 'app-shop-all',
  templateUrl: './shop-all.page.html',
  styleUrls: ['./shop-all.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ShopAllPage implements OnInit {
  menuType: string = 'overlay';
  Products: StockItemViewModel[] = [];
  stockItems: Stock_Item[] = [];
  searchedStockItem: Stock_Item[]=[];
  searchString: string = "";
  stockType: StockTypes[]=[];

  counter=document.querySelector("#counter"); 

  isLoading: boolean = false;
  constructor(private _modalController: ModalController, public loadingController: LoadingController,
    private _router: Router, private alertController: AlertController, private typeservice: StockTypeDataService,
    private basketservice: BasketService, private service: StockItemDataService, private bestsellerservice: BestsellersService) { }

  SearchForm: FormGroup = new FormGroup({
    name:new FormControl('',[Validators.required])
  })
    
  searchStockType(){
    this.searchString=this.SearchForm.get('name')?.value;
    this.searchedStockItem = this.stockItems.filter(
      f => f.stock_Item_Name.toLowerCase().includes(this.searchString.toLowerCase()));
  }

  ngOnInit() {
    this.isLoading=true;  
    this.GetStockItems();
    this.GetTypes();
    if(this.searchString === "")
    {
      this.searchedStockItem = this.stockItems;
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
    this.isLoading=true; 
    this.service.GetStockItems().subscribe(result => {
      this.Products = result as StockItemViewModel[];
      console.log(this.Products)
      this.isLoading=false;  
    })
  }

  async Help() {
    const alert = await this.alertController.create({
      header: 'How to use: ',
      subHeader: 'To add an item to your basket click the "Add to basket" button',
      message:'Proceed to the basket tab to view your items and add personalization.',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        /*handler: () => {
          this.reloadPage();
        }*/
      }],
    });
    await alert.present();
  }

//========= Search by Stock Type ===========
  stocktypes: StockTypes[] =[];
  GetTypes(){
    this.typeservice.GetStockTypes().subscribe(result => {
      this.stocktypes = result as StockTypes[];
      console.log(this.stocktypes);
      
    })
  }

  GetByType(type: string){
    this.isLoading=true; 
    this.service.GetAllStockItemsByType(type).subscribe(result => {
      this.Products = result as StockItemViewModel[];
      console.log(this.Products)
      this.isLoading=false; 
    })
  }

  
//========= Basket ===========
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
    } 
    catch {
      this.addToBasketErrorAlert();
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
        /*handler: () => {
          this.reloadPage();
        }*/
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

  