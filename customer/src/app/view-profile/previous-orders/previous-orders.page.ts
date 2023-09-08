import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController,AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SalesVM } from 'src/app/ViewModels/salesVM';
import { ProductRatingDataService } from 'src/app/Services/productrating.service';
import { SalesService } from 'src/app/Services/sales.service';
@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.page.html',
  styleUrls: ['./previous-orders.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreviousOrdersPage implements OnInit {
  customerUsername!: string;
  orders: SalesVM [] = []
  constructor(private _modalController: ModalController, private _router: Router, 
    private alertController:AlertController, private ratingservice: ProductRatingDataService,
    private service: SalesService) { }


  ngOnInit() {    
    this.customerUsername = JSON.parse(JSON.stringify(localStorage.getItem('username')))// JSON.parse(localStorage.getItem('customerID') as string)
    this.getPreviousOrders()
    //console.log("Customer"+customerID);
  }

  getPreviousOrders(){
    this.service.getPreviousOrders(this.customerUsername).subscribe(result =>{
      this.orders = result as SalesVM[]
      console.log(this.orders)
    })
  }
  public ProductRating() {
    this._router.navigate(["/tabs/product-rating"])
  }

}
