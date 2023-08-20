import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderService } from '../Services/order.service';
import Chart from 'chart.js/auto';
//import { Chart, ChartData } from 'chart.js';
import { LineController,LineElement,PointElement, LinearScale,Title,CategoryScale,BarController,BarElement } from 'chart.js';
import { OrderLineItemVM } from '../ViewModels/orderlineitemVM';
import { SalesVM } from '../ViewModels/salesVM';
Chart.register(LineController,LineElement,PointElement, LinearScale,Title,CategoryScale,BarController,BarElement);
@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SalesPage implements OnInit {
  data: any;
  chart: any = []
  private labeldata: any[] = [];
  private realdata: any[] = [];
  private chartInfo: any;
  constructor(private service: OrderService) { }  
  
  ngOnInit(): void {
    this.service.GetSales().subscribe(result => {
      this.chartInfo = result;
      console.log(this.chartInfo)

      if (this.chartInfo != null) {
        for (let i = 0; i < this.chartInfo.length; i++) {
          this.labeldata.push(this.chartInfo[i].stock_Item_Name);
          this.realdata.push(this.chartInfo[i].order_Line_Item_Quantity);
          //this.colordata.push(this.chartInfo[i].colorcode);
        }
        this.createChart(this.labeldata, this.realdata); //, this.colordata
      }
    }); 
    // this.data = result.$values;
    // this.populateChartData(this.chartInfo);
    // console.log('data', this.chartInfo)
    // return this.chartInfo    
  }

  createChart(labeldata: any, realdata: any) //, colordata: any
  {
    this.chart = new Chart('MyChart', {
      type: 'bar', //this denotes tha type of chart
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'No of sales',
            data: realdata,
            //backgroundColor: colordata,
            barThickness: 40,
          },
        ],
      },
      options: {
        aspectRatio: 2,
      },
    });
  }
   
    
  

  populateChartData(data: SalesVM[]) {   

    console.log(this.data)
    let labelsData: string [] = [];
    let labelsAmount: number [] = [];
    
    data.forEach((element: any) => {
      labelsData.push(element.stock_Item_Name);
      labelsAmount.push(element.order_Line_Item_Quantity)
    });

    this.chart = new Chart("MyChart", {
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
