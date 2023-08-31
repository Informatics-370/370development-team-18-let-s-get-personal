import { Component, OnInit, EnvironmentInjector, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController, IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
//for modal
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
//services and models
import { StockItemDataService } from 'src/app/Services/stockitem.service';
import { Stock_Item } from 'src/app/Models/stockitem';
import { BestsellersService } from 'src/app/Services/bestsellers.service';
import { InventoryDataService } from 'src/app/Services/inventory.service';
import { StockTypes } from 'src/app/Models/stocktypes';
import { StockTypeDataService } from 'src/app/Services/stocktype.service';
import { StockItemColours } from 'src/app/Models/stockitemcolour';
import { StockItemColourDataService } from 'src/app/Services/stockitemcolours.service';
import { Stock_Image } from 'src/app/Models/stockimage';
import { StockImageDataService } from 'src/app/Services/stockimage.service';
import { StockItemViewModel } from 'src/app/ViewModels/stockitemsVM';
import { InventoryViewModel } from 'src/app/ViewModels/InventoryVM';
import { PersonalisationService } from 'src/app/Services/personalisation.service';
import { Image_Price } from 'src/app/Models/imageprice';
import { TextPrice } from 'src/app/Models/textprice';
@Component({
  selector: 'app-stock-take',
  templateUrl: './stock-take.page.html',
  styleUrls: ['./stock-take.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class StockTakePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal
  errormsg: string = ""; 
  inventory: InventoryViewModel[] =[];
  Products: StockItemViewModel[] = [];

  stockitems!: Stock_Item[];
  stocktypes: StockTypes[] =[];
  stockitemcolours: StockItemColours[] = [];
  stockimages: Stock_Image[] =[];

  constructor(public environmentInjector: EnvironmentInjector, private router: Router,
    public bestsellerservice:BestsellersService, private alertController:AlertController,     
    //dataservices
    public stockitemservice: StockItemDataService, private typeservice:StockTypeDataService,
    private imageservice:StockImageDataService, private colourservice:StockItemColourDataService,
    private inventoryservice: InventoryDataService, public pservice: PersonalisationService) { }
    
  ngOnInit() {
    this.GetAllStockItems();
  }

  UpdateQuantity(){
    
  }

  Writeoff()
  {
    this.router.navigate(['./tabs/write-off']);
  }

  GetAllStockItems(){
    this.stockitemservice.GetStockItems().subscribe(result =>{
      this.Products = result as StockItemViewModel[];
    })    
  }

  
}
