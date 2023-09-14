import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule} from '@ionic/angular';
import { Router } from '@angular/router';
import { DeliveryDataService } from '../Services/deliveries.service';
import { Delivery_Company } from '../Models/deliverycompany';
import { StockTypeDataService } from '../Services/stocktype.service';
import { StockTypes } from '../Models/stocktypes';
import { Refund_Policy } from 'src/app/Models/refundpolicy';
import { RefundService } from 'src/app/Services/refund.service';
import { RefundVM } from 'src/app/ViewModels/refundVM';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class FaqPage implements OnInit {
  
  constructor(private _router: Router, public delservice: DeliveryDataService, private typeservice: StockTypeDataService
    ,private service: RefundService) { }

  ngOnInit() {
    this.getDeliveryCompany()
    this.GetTypes()
  }
  public ViewRefundPolicy() {
    this._router.navigate(["/tabs/view-refund-policy"])
  }

  public ContactUs() {
    this._router.navigate(["/tabs/contact-us"])
  }

  deliverycompanies:Delivery_Company[]=[];
  getDeliveryCompany(){
    this.delservice.GetDeliveryCompanies().subscribe(result =>{
      this.deliverycompanies = result as Delivery_Company[];
      console.log(this.deliverycompanies)
    })
  }

  stocktypes: StockTypes[] =[];
  GetTypes(){
    this.typeservice.GetStockTypes().subscribe(result => {
      this.stocktypes = result as StockTypes[];
      console.log(this.stocktypes);
    })
  }

  refundPolicy: Refund_Policy[] = [];
  policy: RefundVM[]=[];
  public GetAllRefundPolicies() {
    this.service.GetAllRefundPolicies().subscribe(result => {
      this.policy = result as RefundVM[];
      console.log(this.refundPolicy)
    })
  }
}
