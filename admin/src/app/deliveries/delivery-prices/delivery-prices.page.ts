import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export type jsPDFDocument = any;
type Opts = { [key: string]: string | number }
import { AuditTrailService } from 'src/app/Services/audittrail.service';
import { AuditTrail } from 'src/app/Models/adittrail';
import { DeliveryDataService } from 'src/app/Services/deliveries.service';
import { Delivery_Company } from 'src/app/Models/deliverycompany';
import { Delivery } from 'src/app/Models/delivery';
import { DeliveryViewModel } from 'src/app/ViewModels/deliveryVM';
@Component({
  selector: 'app-delivery-prices',
  templateUrl: './delivery-prices.page.html',
  styleUrls: ['./delivery-prices.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DeliveryPricesPage implements OnInit {

  constructor(private service:DeliveryDataService, private router: Router, public modalCtrl: ModalController,
    private alertController:AlertController, private trailservice: AuditTrailService) 
  { }
  isLoading: boolean = false;
  ngOnInit() {
    this.getDeliveryCompany()
    this.isLoading=true;
  }

  backNav()
  {
    this.router.navigate(['./tabs/deliveries']);
  }

  deliverycompanies:Delivery_Company[]=[];
  getDeliveryCompany(){
    this.service.GetDeliveryCompanies().subscribe(result =>{
      this.deliverycompanies = result as Delivery_Company[];
      this.deliverycompanies.forEach(company => {
    
        //Fetch Total per type
        this.DeliveryChargeControlBreak(company)
        this.isLoading=false;  
      });
    })
  }

  deliveries: DeliveryViewModel[] =[];
  DeliveryChargeControlBreak(company: Delivery_Company){
    this.service.GetAllDeliveriesByCompany(company.delivery_Company_Name).subscribe(result =>{
      // stockType = company
      company.companycontrolbreak = result;

      company.delivery_Company_Total = 0

      company.companycontrolbreak.forEach(item => {
        company.delivery_Company_Total += item.delivery_Price;
      });     
    },(error) => {
      //this.editErrorAlert();        
      console.error('DeliveryChargeControlBreak error:', error);
    })
  }

  @ViewChild('htmlData') htmlData!: ElementRef;
  
  openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {       
      //Initialize JSPDF
      let PDF = new jsPDF('p', 'mm', 'a4');
      //Converting canvas to Image
      const FILEURI = canvas.toDataURL('image/png');
      //Add image Canvas to PDF
      let fileWidth = 500;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;      
      let position = 10;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);        
          
      PDF.save('IPKP-DeliveryPriceReport.pdf');
    });
  }

}
