import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController,AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Stock_Item } from '../Models/stockitem';


@Component({
  selector: 'app-shop-all',
  templateUrl: './shop-all.page.html',
  styleUrls: ['./shop-all.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ShopAllPage implements OnInit {
  menuType: string = 'overlay';

  stockItem: Stock_Item[] = [];
  constructor(private _modalController: ModalController, private _router: Router, private alertController:AlertController) { }

  ngOnInit() {
    
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

  //Load Stock Items
  updateGrid() {
    
  }

  addToBasket(){
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
