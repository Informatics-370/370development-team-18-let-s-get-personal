import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OrdersPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  prevOrders()
  {
    this.router.navigate(['./tabs/orders']);//button needs to be moved in the profile.. or not idk:) 
  }
}
