import { Component, OnInit, EnvironmentInjector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { StockItemDataService } from 'src/app/Services/stockitem.service';
import { Stock_Item } from 'src/app/Models/stockitem';
import { BestSellerDataService } from 'src/app/Services/bestsellers.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class InventoryPage implements OnInit {
  stockItems: Stock_Item[] =[];
  
  constructor(public environmentInjector: EnvironmentInjector, private router: Router,
    public stockitemservice: StockItemDataService, public bestsellerservice:BestSellerDataService, 
    private alertController:AlertController) { }

  ngOnInit() {
  }

  stocktypes()
  {
    this.router.navigate(['./stocktypes']);
  }
  stockcoloursnav()
  {
    this.router.navigate(['./stockitemcolours']);
  }

  addToBestSellers(bestseller: Stock_Item){
    this.bestsellerservice.AddBestSeller(bestseller).subscribe((response:any) => {
      if(response == null)
      {
        this.addToBestSellersErrorAlert();
      }
      else{
        this.addToBestSellersSuccessAlert();
      }
    })
  }
  
  GetAllStockItems(){
    this.stockitemservice.GetStockItems().subscribe(result =>{
      this.stockItems = result as Stock_Item[];
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
