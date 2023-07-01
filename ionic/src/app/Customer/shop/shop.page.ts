import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { Stock_Item } from 'src/app/Models/stockitem';
import { StockItemDataService } from 'src/app/Services/stockitem.service';
import { BasketService } from 'src/app/Services/basket.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { SharedDirectivesModule } from 'src/app/Directives/shared-directives.module';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedDirectivesModule]
})
export class ShopPage implements OnInit {
  public stockItemList: Stock_Item[] = [];
  public loading: boolean = true;
  private loadingModel: any;
  public quantity:any;

  constructor( private toastController: ToastController, private loadingController: LoadingController,
    private stockItemService: StockItemDataService, private basketService: BasketService, 
    private authService: AuthenticationService) 
  { 

  }

  async ngOnInit() {
    await this.showLoading();
    
  }

  logoutAddToCart() {
    this.authService.Logout();
  }

  async addToBasket(stockItem: Stock_Item, newQuantity: number) {
    this.basketService.addProductToBasket(stockItem, newQuantity);
  }

  async showLoading() {
    this.loadingModel = await this.loadingController.create({
      message: 'Loading Stock Items...',
    });
    await this.loadingModel.present();
  }

}
