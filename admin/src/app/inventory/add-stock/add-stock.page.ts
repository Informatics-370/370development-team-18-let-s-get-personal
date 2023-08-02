import { Component, OnInit, EnvironmentInjector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController, IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { StockItemDataService } from 'src/app/Services/stockitem.service';
import { Stock_Item } from 'src/app/Models/stockitem';
import { BestsellersService } from 'src/app/Services/bestsellers.service';
import { BasketService } from 'src/app/Services/basket.service';
import { Inventory } from 'src/app/Models/inventory';
import { InventoryDataService } from 'src/app/Services/inventory.service';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.page.html',
  styleUrls: ['./add-stock.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule, HttpClientModule]
})
export class AddStockPage implements OnInit {

  inventory: Inventory[] =[];
  Products!: Stock_Item[];
  quantities: Array<any> = [];
  //productForm!: FormGroup;
  basketList: Array<Stock_Item> = [];
  productIds: Array<any> = [];
  constructor(public environmentInjector: EnvironmentInjector, private router: Router,
    public stockitemservice: StockItemDataService, public bestsellerservice:BestsellersService, 
    private alertController:AlertController, private basketService : BasketService,
    private inventoryservice: InventoryDataService) { }

    ngOnInit() {
    }

    AddStockForm: FormGroup = new FormGroup({
      Stock_Item_Name: new FormControl('',[Validators.required]),
      Stock_Item_Price: new FormControl('',[Validators.required]),
      Stock_Item_Size: new FormControl('',[Validators.required]),
      Stock_Type_ID: new FormControl('',[Validators.required]),
      Stock_Image_ID: new FormControl('',[Validators.required]),
      Stock_Item_Colour_ID: new FormControl('',[Validators.required]),
    })
}
