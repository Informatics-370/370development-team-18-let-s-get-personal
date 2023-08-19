import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderService } from '../Services/order.service';
import { Chart,registerables } from 'node_modules/chart.js';
import { OrderLineItemVM } from '../ViewModels/orderlineitemVM';
import { SalesVM } from '../ViewModels/salesVM';
Chart.register(...registerables);
@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SalesPage implements OnInit {
  data: any;
  @ViewChild('myTemp')
  myTempRef!: ElementRef;

  constructor(private service: OrderService) { }

  ngOnInit(): void {
    this.service.GetSales().subscribe(result => {
      let salesList = result;
      console.log(salesList)
      this.data = result.$values;
      console.log(this.data)
      this.populateChartData(this.data);
      console.log('data', salesList)
      return salesList
    });
  }

  populateChartData(data: SalesVM[]) {
    
    let labelsData: string [] = [];
    let labelsAmount: number [] = [];
    
    data.forEach((element: any) => {
      labelsData.push(element.Stock_Item_Name);
      labelsAmount.push(element.order_Line_Item_Quantity)
    });


    new Chart("barchart", {
      type: 'bar',
      data: {
        labels: labelsData,
        datasets: [{
          label: '# of Sales',
          data: labelsAmount,
          borderWidth: 1
        }]
      },
      
      options: {
        scales: {
          y: {
            beginAtZero: true
          },
        }
      
      }
    });
  }

}
