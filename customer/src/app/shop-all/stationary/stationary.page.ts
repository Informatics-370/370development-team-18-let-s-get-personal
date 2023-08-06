import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController,AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Stock_Item } from 'src/app/Models/stockitem';

@Component({
  selector: 'app-stationary',
  templateUrl: './stationary.page.html',
  styleUrls: ['./stationary.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class StationaryPage implements OnInit {
  menuType: string = 'overlay';

  stockItem: Stock_Item[] = [];
  constructor(private _modalController: ModalController, private _router: Router, private alertController:AlertController) { }

  ngOnInit() {
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

  //Load Stock Items
 /* updateGrid() {
    var grid = document.querySelector("#grid");

    if (grid) {
      grid.innerHTML = " ";
      for (var i = 0; i < this.stockItem.length; i++) {
        `<ion-row>` +
          `<ion-col>` +
          `<ion-card>` +
          `<ion-card-title>Name: ${this.stockItem[i].stock_Item_Name}</ion-card-title>` +
          `<ion-card-content>` +
          `<ion-img>${this.stockItem[i].stock_Images.stock_Image_File}</ion-img>` +
          `<p>${this.stockItem[i].stockitemcolours.Stock_Item_Colour_Name}</p>` +
          `<p>R: ${this.stockItem[i].stock_Item_Price}</p>` +
          `</ion-card-content>` +
          `</ion-card>` +
          `<ion-button (click)="addToBasket(${this.stockItem[i].stock_Item_ID})" >Add To Basket</ion-button>` +
          `</ion-col>` +
          `<ion-row>`;
      }

      //visibility();
      //Subtotal();
    }
    //save to local storage
    // localStorage.setItem("cart",JSON.stringify(cart));
  }

  /*!!!!!!!!!!!!!!UPDATE!!!!!!!!!!! */
  addToBasket(){
//const item=this.stockItem.find((stockItem)=>stockItem.Stock_Item_ID==id);
this.addToBasketSuccessAlert();
//alert("Added to basket successfully")
  }
/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
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
