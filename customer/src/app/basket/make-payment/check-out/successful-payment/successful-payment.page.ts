import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrderT } from 'src/app/Models/basket';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-successful-payment',
  templateUrl: './successful-payment.page.html',
  styleUrls: ['./successful-payment.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SuccessfulPaymentPage implements OnInit {
  showAnimation = false;
  order = new OrderT();

  constructor(private router:Router,private orderService:OrderService) { }

  ngOnInit() {
    this.order = JSON.parse(localStorage.getItem('order') as string)
    this.order.paid=true;
    this.placeOrder(this.order);

  }

  private placeOrder(order:OrderT):void{
    this.orderService.placeOrder(order).subscribe(res=>{
      localStorage.removeItem("order");
      localStorage.removeItem("cart");
      console.log(res);
    },err=>{
      console.log(err);
      localStorage.removeItem("order");
      localStorage.removeItem("cart"); 
    })
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.showAnimation = true;
    }, 1000);
  }

  redirectToShopping() {
    this.router.navigate(['/']); // Replace 'shopping' with your shopping page route
  }

}
