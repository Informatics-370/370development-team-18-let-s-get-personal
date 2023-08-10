import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController,AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
//import { Stock_Item } from 'src/app/Models/stockitem';
//import { BasketService } from 'src/app/Services/basket.service';
import { StockTypes } from 'src/app/Models/stocktypes';
import { StockTypeDataService } from 'src/app/Services/stocktype.service';


@Component({
  selector: 'app-drinking',
  templateUrl: './drinking.page.html',
  styleUrls: ['./drinking.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DrinkingPage implements OnInit {
  menuType: string = 'overlay';

  stockItems: any=[];
  stockTypes: StockTypes[]=[];

  constructor(private _modalController: ModalController,
    private _router: Router, private alertController:AlertController,
    private service:StockTypeDataService) { }


//make the array only take acertain type of items
    ngOnInit() {
      /*if(StockTypes.stock_Type_Name=="Drinks"){
      //StockTypes.Stock_Item===this.stockItems;
      }*/
      for(let i of this.stockTypes){
        i.stock_Type_Name=="Drinks";
        i.stock_Item==this.stockItems;
      }
    }

    public GetStockType(stock_Type_ID: string){
      this.service.GetStockType(stock_Type_ID).subscribe(result =>{
        this.stockTypes = result as StockTypes[];
        console.log(this.stockTypes)
      })
    }

  public clothing(){
    this._router.navigate(["/tabs/clothing"])
  }
  public shopall(){
    this._router.navigate(["/tabs/shop-all"])
  }
  public stationary(){
    this._router.navigate(["/tabs/stationary"])
  }
  public Basket() {
    this._router.navigate(["/tabs/basket"])
  }

  addToBasket(stockItems:any):void{

    let cartItems = JSON.parse(localStorage.getItem('cart') as string) || [];
    let existingItem = cartItems.find((cartItem:any) => cartItem.id === stockItems.stock_Item_ID);

    if (!existingItem) {
      cartItems.push({ ...stockItems, quantity: 1 });
    } else {
      
      existingItem.quantity += 1;
    }
    localStorage.setItem('cart',JSON.stringify(cartItems));
    this.addToBasketSuccessAlert();
  }

  /*
  addToBasket(stockItem: Stock_Item, newQuantity: number){
    this.basketservice.addProductToBasket(stockItem,newQuantity)
this.addToBasketSuccessAlert();
  } */


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
      subHeader: 'Discount Was Not Added',
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
