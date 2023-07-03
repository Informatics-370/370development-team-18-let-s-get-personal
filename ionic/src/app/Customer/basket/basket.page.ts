import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { BasketItem } from 'src/app/Models/basket';
import { BasketService } from 'src/app/Services/basket.service';
import { Stock_Item } from 'src/app/Models/stockitem';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BasketPage implements OnInit {
  basketItemList:BasketItem[]=[]
  basketList: any;
  productIds: any;
  quantities: any;

  constructor(private basketService : BasketService, private alertController:AlertController) { }

  ngOnInit() { 
    this.GetBasket
  }

  GetBasket(Customer_ID: Number){
    this.basketService.GetBasket(Customer_ID).subscribe(result => {
      this.basketList = result  
      console.log(result);
      if(result==null){
        this.basketList = JSON.parse(localStorage.getItem('basket')!);
        console.log(this.basketList)
      }
    })
    if(this.basketList == null){
      this.NoBasketItemsAlert()
    }
  }

  async NoBasketItemsAlert() {
    const alert = await this.alertController.create({
      header: 'No items in basket',
      subHeader: 'We cannot find any items in basket for you',
      buttons: ['OK'],
    });
    await alert.present();
  }

  //removeFromBasket(stockItem: Stock_Item){
    //this.basketService.removeItemFromBasket(stockItem);
  //}

  removeFromBasket(item: Stock_Item){ 
    try{
      this.basketList.splice(this.basketList.indexOf(item),1);
      this.productIds = JSON.parse(localStorage.getItem('productIds')!);
      this.quantities = JSON.parse(localStorage.getItem('quantities')!);
      this.productIds.splice(this.productIds.indexOf(item),1);
      this.quantities.splice(this.quantities.indexOf(item),1);
      localStorage.setItem('basket',JSON.stringify(this.basketList));
      localStorage.setItem('productIds',JSON.stringify(this.productIds));
      localStorage.setItem('quantities',JSON.stringify(this.quantities));
    }   
    catch{
      this.deleteFromBasketErrorAlert();
    }
    
  }

  ConfirmedEmpty(){
    this.basketService.clearBasket();
    this.basketList = JSON.parse(localStorage.getItem('basket')!);
    if(this.basketList == null){
      this.EmptyBasketSuccessAlert();
    }
    else{
      this.EmptyBasketErrorAlert();
    }
  }

  async deleteFromBasketErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Item Was Not Deleted',
      message: 'Please try again',
      buttons: ['OK'],
    });
    await alert.present();
  }
  
  handlerMessage = '';
  roleMessage = '';
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        this.handlerMessage = 'Alert canceled';
        this.ConfirmedEmpty();
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.handlerMessage = 'Alert confirmed';
      },
    },
  ];

  async EmptyBasketErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Basket was not emptied',
      message: 'Please try again',
      buttons: ['OK'],
    });
    await alert.present();
  }
  async EmptyBasketSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Cart Emptied!',
      subHeader: 'Basket was emptied',
      buttons: ['OK'],
    });
    await alert.present();
  }

  //setResult(ev) {
  //  this.roleMessage = `Dismissed with role: ${ev.detail.role}`;
  //}
  

}
