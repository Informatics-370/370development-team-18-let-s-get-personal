import { Component, OnInit, EnvironmentInjector, ViewChild, ElementRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderService } from '../Services/order.service';
import { OrderLineItemVM } from '../ViewModels/orderlineitemVM';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export type jsPDFDocument = any;
type Opts = { [key: string]: string | number }
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OrdersPage implements OnInit {
  orderRequests: OrderLineItemVM[] =[]
  constructor(private router: Router, public service: OrderService) { }

  ngOnInit() {
    this.GetOrdersInProgress()
  }

  GetOrdersInProgress(){
    this.service.GetOrdersInProgress().subscribe(result =>{
      this.orderRequests = result as OrderLineItemVM[]
    })
  }
  
  prevOrders()
  {
    this.router.navigate(['./tabs/sales']);
  }
}
