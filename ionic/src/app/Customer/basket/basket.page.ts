import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BasketItem } from 'src/app/Models/basket';
import { BasketService } from 'src/app/Services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BasketPage implements OnInit {
  basketItemList:BasketItem[]=[]


  constructor(private basketService : BasketService) { }

  ngOnInit() {
    this.getBasket();
  }

  getBasket(){
    this.basketItemList = this.basketService.getCurrentBasket();
  }

  removeFromBasket(){
    this.basketService.removeItemFromBasket(stockItem).subscribe(result =>{
      window.location.reload();
     });
  }

  

  

}
