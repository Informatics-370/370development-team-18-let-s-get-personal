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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
export type jsPDFDocument = any;
type Opts = { [key: string]: string | number }
@Component({
  selector: 'app-product-trends',
  templateUrl: './product-trends.page.html',
  styleUrls: ['./product-trends.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProductTrendsPage implements OnInit {
  private readonly jsPDFDocument: jsPDFDocument
  data: any;
  chart: any = []
  private labeldata: any[] = [];
  private realdata: any[] = [];
  private chartInfo: any;
  constructor(private service: OrderService) { }  
  
  ngOnInit(): void {
    this.service.GetAllOrders().subscribe(result => {
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
  }

  createChart(labeldata: any, realdata: any) //, colordata: any
  {
    this.chart = new Chart('MyChart', {
      type: 'bar', //this denotes tha type of chart
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'No. of sales',
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

  @ViewChild('TrendsData') TrendsData!: ElementRef;
  
  openPDF(): void {
    let DATA: any = document.getElementById('TrendsData');
    html2canvas(DATA).then((canvas) => {       
      //Initialize JSPDF
      let PDF = new jsPDF('p', 'mm', 'a4');
      //Converting canvas to Image
      const FILEURI = canvas.toDataURL('image/png');
      //Add image Canvas to PDF
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;      
      let position = 10;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);        
          
      PDF.save('IPKP-Product-Trends.pdf');
    });
  }

}
