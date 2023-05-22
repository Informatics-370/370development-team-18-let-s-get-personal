import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';

import { Order } from 'src/app/Models/orders';

@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.page.html',
  styleUrls: ['./previous-orders.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreviousOrdersPage implements OnInit {
  orders: Order[] =[];
  constructor(private router:Router) { }

  ngOnInit() {
  }

  public getProductRatings():void {
    this.router.navigate(['./product-rating']);
  }
}
