import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController,AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Stock_Item } from 'src/app/Models/stockitem';
import { StockTypeDataService } from 'src/app/Services/stocktype.service';
import { StockTypes } from 'src/app/Models/stocktypes';


@Component({
  selector: 'app-stationary',
  templateUrl: './stationary.page.html',
  styleUrls: ['./stationary.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class StationaryPage implements OnInit {
  menuType: string = 'overlay';

  stockItems: any = [];

  stockTypes:StockTypes[]=[];

  constructor(private _modalController: ModalController,
    private _router: Router, private alertController:AlertController,
    private service:StockTypeDataService) { }

  ngOnInit() {
     /*if(StockTypes.stock_Type_Name=="Stationary"){
      //StockTypes.Stock_Item===this.stockItems;
      }*/
      for(let i of this.stockTypes){
        i.stock_Type_Name=="Stationary";
        i.stock_Item==this.stockItems;
      }
  }

  public GetStockType(stock_Type_ID: string){
    // this.service.GetStockType(stock_Type_ID).subscribe(result =>{
    //   this.stockTypes = result as StockTypes[];
    //   console.log(this.stockTypes)
    // })
  }

  public clothing(){
    this._router.navigate(["/tabs/clothing"])
  }
  public drinking(){
    this._router.navigate(["/tabs/drinking"])
  }
  public shopall(){
    this._router.navigate(["/tabs/shop-all"])
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
//const item=this.stockItem.find((stockItem)=>stockItem.Stock_Item_ID==id);
this.addToBasketSuccessAlert();
this.basketservice.addProductToBasket(stockItem,newQuantity)
//alert("Added to basket successfully")
  }*/

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
