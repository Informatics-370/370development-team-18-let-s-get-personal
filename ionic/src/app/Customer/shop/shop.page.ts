import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { StockItem } from 'src/app/Models/stockitem';
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
  public stockItemList: StockItem[] = [];
  public loading: boolean = true;
  private loadingModel: any;
  public quantity:any;

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private stockItemService: StockItemDataService,
    private basketService: BasketService,
    private authService: AuthenticationService
  ) { }

  async ngOnInit() {
    await this.showLoading();
    this.stockItemService.GetStockItems().subscribe((data) => {
      this.stockItemList = data;
      this.loading = false;
      this.loadingModel.dismiss();
    });
  }

  logout() {
    this.authService.Logout();
  }

  async addToBasket(stockItem: StockItem, quantity: number) {
    if (!quantity || quantity < 1) {
      const toast = await this.toastController.create({
        message: 'Please enter a quantity above zero',
        duration: 3000,
        position: 'top',
        icon: 'alert-circle-outline',
        color: 'warning'
      });
      toast.present();
    } else {
      this.basketService.addProductToBasket(stockItem, quantity);
      const toast = await this.toastController.create({
        message: 'Added to basket!',
        duration: 3000,
        position: 'top',
        icon: 'checkmark-circle-outline',
        color: 'success'
      });
      toast.present();
    }
  }

  async showLoading() {
    this.loadingModel = await this.loadingController.create({
      message: 'Loading Stock Items...',
    });
    await this.loadingModel.present();
  }

}
