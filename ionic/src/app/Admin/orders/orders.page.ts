import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, PopoverController } from '@ionic/angular';
import { Order } from 'src/app/Models/orders';
import { Order_Status } from 'src/app/Models/orderstatus';
import { HttpClient } from '@angular/common/http';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OrdersPage implements OnInit {

  orders: Order[] = []; 
  statuses: Order_Status[] = [];

  constructor(private http: HttpClient, 
    private popoverController: PopoverController,
    private service: OrderService) { }

  ngOnInit() {
    this.getOrders();
    this.getStatuses();
  }

  public getOrders(){
    this.service.GetOrders().subscribe((result: any) => {
      this.orders = result;
    })
  }

  public getStatuses(){
    this.service.GetAllOrderStatuses().subscribe((result: any) => {
      this.statuses = result;
    })
  }

  // async showStatusPopup(order: Order) {
  //   const popover = await this.popoverController.create({ 
  //     component: OrderStatusPopupPage,
  //     componentProps: { order, statuses: this.statuses },
  //     translucent: true
  //   });

  //   popover.onDidDismiss().then((data) => {
  //     if (data && data.data) {
  //       this.UpdateOrderStatus(order.OrderId, data.data);
  //     }
  //   });

  //   return await popover.present();
  // }

  public UpdateOrderStatus(OrderID:Number, newStatus: Order_Status){
    if(newStatus.Order_Status_Description == "Processing"){
      return this.service.ProcessOrder(OrderID);
    }else if(newStatus.Order_Status_Description == "Completed"){
      return this.service.CompleteOrder(OrderID);
    }else{
      return null;
    }
  }
}

// @Component({
//   template: `<ion-list>
//       <ion-list-header>
//         <ion-label>Select Status</ion-label>
//       </ion-list-header>
//       <ion-item *ngFor="let status of statuses">
//         <ion-label>{{ status }}</ion-label>
//         <ion-radio slot="start" [value]="status" (click)="closePopover(status)"></ion-radio>
//       </ion-item>
//     </ion-list> `,
// })
// export class OrderStatusPopupPage {
//   order: any;
//   statuses: string[] = [];

//   constructor(private popoverController: PopoverController) { }

//   closePopover(selectedStatus: string) {
//     this.popoverController.dismiss({ newStatus: selectedStatus });
//   }
// }