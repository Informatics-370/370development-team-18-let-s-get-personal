import { AfterViewInit, Component, ElementRef, ViewChild, OnInit, EnvironmentInjector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderService } from '../Services/order.service';
import { RouterModule, Router } from '@angular/router';
import { OrderLineItemVM } from '../ViewModels/orderlineitemVM';
import { SalesService } from '../Services/sales.service';
import { Payment } from '../Models/payment';
import { StockItemViewModel } from 'src/app/ViewModels/stockitemsVM';
import { Stock_Item } from 'src/app/Models/stockitem';
import { StockItemDataService } from 'src/app/Services/stockitem.service';
import { SalesVM } from '../ViewModels/salesVM';
import { StockTypeDataService } from '../Services/stocktype.service';
import { StockTypes } from '../Models/stocktypes';

@Component({
  selector: 'app-saleperproduct',
  templateUrl: './saleperproduct.page.html',
  styleUrls: ['./saleperproduct.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SaleperproductPage implements OnInit {
  sales: Payment[] =[]
  constructor(private service: SalesService, private router: Router, public stockitemservice: StockItemDataService,
    public environmentInjector: EnvironmentInjector, private typeservice: StockTypeDataService) 
  { }

  ngOnInit() {
    this.GetSalesList()
  }

  GetSalesList()
  {
    this.service.GetAllSales().subscribe(res => {
      this.sales = res as Payment[]
    })
  }

}
