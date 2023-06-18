import { Component, OnInit, EnvironmentInjector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { StockItemDataService } from 'src/app/Services/stockitem.service';
import { Stock_Item } from 'src/app/Models/stockitem';

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
    public stockitemservice: StockItemDataService) { }

  ngOnInit() {
  }

  stocktypes()
  {
    this.router.navigate(['./tabsstocktypes']);
  }
  stockcoloursnav()
  {
    this.router.navigate(['./tabsstockitemcolours']);
  }

  addToBestSellers(Stock_Item_ID: Number){

  }
  
  GetAllStockItems(){
    this.stockitemservice.GetStockItems().subscribe(result =>{
      this.stockItems = result as Stock_Item[];
    })
  }
}
