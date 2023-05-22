import { Component, OnInit, EnvironmentInjector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
//import { StockTypeDataService } from 'src/app/Services/stocktype.service';
//import { StockTypes } from 'src/app/Models/stocktypes';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
  //providers: [StockTypeDataService]
})
export class InventoryPage implements OnInit {
  //stocktype: StockTypes[] =[];
  constructor(public environmentInjector: EnvironmentInjector, private router: Router) { }

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
  //GetStockTypes(){
    //this.service.GetStockTypes().subscribe(result =>{
     // this.stocktype = result as StockTypes[];
    //})
 // }
}
