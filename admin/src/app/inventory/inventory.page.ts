import { Component, OnInit, EnvironmentInjector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { StockItemDataService } from 'src/app/Services/stockitem.service';
import { Stock_Item } from 'src/app/Models/stockitem';
import { BestsellersService } from 'src/app/Services/bestsellers.service';
import { BasketService } from 'src/app/Services/basket.service';
import { InventoryDataService } from '../Services/inventory.service';
import { StockTypes } from 'src/app/Models/stocktypes';
import { StockTypeDataService } from 'src/app/Services/stocktype.service';
import { StockItemColours } from 'src/app/Models/stockitemcolour';
import { StockItemColourDataService } from 'src/app/Services/stockitemcolours.service';
import { Stock_Image } from 'src/app/Models/stockimage';
import { StockImageDataService } from 'src/app/Services/stockimage.service';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class InventoryPage implements OnInit {

  Products!: Stock_Item[];
  quantities: Array<any> = [];
  //productForm!: FormGroup;
  basketList: Array<Stock_Item> = [];
  productIds: Array<any> = [];
  constructor(public environmentInjector: EnvironmentInjector, private router: Router,
    public bestsellerservice:BestsellersService, private alertController:AlertController, 
    private basketService : BasketService, private inventoryservice: InventoryDataService,
    //dataservices
    public stockitemservice: StockItemDataService, private typeservice:StockTypeDataService,
    private imageservice:StockImageDataService, private colourservice:StockItemColourDataService) { }

  ngOnInit() {
  }

  stocktypes()
  {
    this.router.navigate(['./tabs/stock-types']);
  }
  stockcoloursnav()
  {
    this.router.navigate(['./tabs/stock-item-colours']);
  }
  stockimagesnav()
  {
    this.router.navigate(['./tabs/stock-image']);
  }
  stocktakenav()
  {
    this.router.navigate(['./tabs/stock-take']);
  }
  
  
  addToBestSellers(bestseller: Stock_Item[]){
    this.bestsellerservice.SaveBestSellersList(bestseller).subscribe((response:any) => {
      if(response == null)
      {
        this.addToBestSellersErrorAlert();
      }
      else{
        this.addToBestSellersSuccessAlert();
      }
    })
  }

  async addToBestSellersSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Item Added To Best Seller List',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async addToBestSellersErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Item Was Not Added',
      message: 'Please try again',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
