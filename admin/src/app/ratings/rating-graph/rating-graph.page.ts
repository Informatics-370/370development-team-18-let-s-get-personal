import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import Chart from 'chart.js/auto';
//import { Chart, ChartData } from 'chart.js';
import { LineController,LineElement,PointElement, LinearScale,Title,CategoryScale,BarController,BarElement } from 'chart.js';
Chart.register(LineController,LineElement,PointElement, LinearScale,Title,CategoryScale,BarController,BarElement);
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
export type jsPDFDocument = any;
type Opts = { [key: string]: string | number }
import { ProductRatingDataService } from 'src/app/Services/productrating.service';
import { ProductRatingVM } from 'src/app/ViewModels/productratingVM';

@Component({
  selector: 'app-rating-graph',
  templateUrl: './rating-graph.page.html',
  styleUrls: ['./rating-graph.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RatingGraphPage implements OnInit {
  private readonly jsPDFDocument: jsPDFDocument
  data: any;
  chart: any = []
  private labeldata: any[] = [];
  private realdata: any[] = [];
  private chartInfo: any;
  constructor(private service: ProductRatingDataService) { }

  ngOnInit() {
    this.service.GetProductRatings().subscribe(result => {
      this.chartInfo = result;
      console.log(this.chartInfo)

      if (this.chartInfo != null) {
        for (let i = 0; i < this.chartInfo.length; i++) {
          this.labeldata.push(this.chartInfo[i].stock_Item_Name);
          this.realdata.push(this.chartInfo[i].product_Star_Rating);
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
            label: 'Rating',
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
