import { Component, OnInit, EnvironmentInjector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
//services and models
import { StockItemDataService } from 'src/app/Services/stockitem.service';
import { Stock_Item } from 'src/app/Models/stockitem';
import { BestsellersService } from 'src/app/Services/bestsellers.service';
import { BasketService } from 'src/app/Services/basket.service';
import { Inventory } from 'src/app/Models/inventory';
import { Inventory_Line_Item } from 'src/app/Models/inventorylineitem';
import { InventoryDataService } from 'src/app/Services/inventory.service';
import { StockTypes } from 'src/app/Models/stocktypes';
import { StockTypeDataService } from 'src/app/Services/stocktype.service';
import { StockItemColours } from 'src/app/Models/stockitemcolour';
import { StockItemColourDataService } from 'src/app/Services/stockitemcolours.service';
import { Stock_Image } from 'src/app/Models/stockimage';
import { StockImageDataService } from 'src/app/Services/stockimage.service';
import { StockItemViewModel } from 'src/app/ViewModels/stockitemsVM';
@Component({
  selector: 'app-stock-take',
  templateUrl: './stock-take.page.html',
  styleUrls: ['./stock-take.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class StockTakePage implements OnInit {
  inventory: Inventory[] =[];
  Products: StockItemViewModel[] = [];
  Types: StockTypes[] =[];
  colours: StockItemColours[] =[];
  images: Stock_Image [] =[];

  stocktypeID!: number;
  stockimageID!: number;
  stockitemcolourID!: number;

  constructor(public environmentInjector: EnvironmentInjector, private router: Router,
    public bestsellerservice:BestsellersService, private alertController:AlertController, 
    private inventoryservice: InventoryDataService,
    //dataservices
    public stockitemservice: StockItemDataService, private typeservice:StockTypeDataService,
    private imageservice:StockImageDataService, private colourservice:StockItemColourDataService) { }

  ngOnInit() {
    this.GetAllStockItems();
    
  }

  GetAllStockItems(){
    this.stockitemservice.GetStockItems().subscribe(result =>{
      this.Products = result as StockItemViewModel[];
    })    
  }

  AddToInventory(){

  }

  GetInventoryLineItems(){

  }

}
