import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Order_Request } from 'src/app/Models/orderrequest';
import { HttpClient } from '@angular/common/http';
import { OrderRequestService } from 'src/app/Services/order-request.service';

@Component({
  selector: 'app-order-requests',
  templateUrl: './order-requests.page.html',
  styleUrls: ['./order-requests.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OrderRequestsPage implements OnInit {

  orderRequests: Order_Request[] = [];

  constructor(private http: HttpClient, private service: OrderRequestService) { }

  ngOnInit() {
    this.service.GetOrderRequests().subscribe((result: any) => {
      this.orderRequests = result;
    })
  }

  acceptOrderRequest(OrderRequestID: Number) {
    this.service.AcceptOrderRequest(OrderRequestID).subscribe((result: any) => {
      this.ngOnInit();
    })
  }

  declineOrderRequest(OrderRequestID: Number) {
    this.service.RejectOrderRequest(OrderRequestID).subscribe((result: any) => {
      this.ngOnInit();
    })
  }

}
