import { Component, OnDestroy, OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DeliveryCompanyDataService } from 'src/app/Services/deliverycompany.service';
import { DeliveryCompany } from 'src/app/Models/deliverycompany';

@Component({
  selector: 'app-delivery-company',
  templateUrl: './delivery-company.page.html',
  styleUrls: ['./delivery-company.page.scss'],
  standalone: true,
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule, FormsModule,DataTablesModule]
})
export class DeliveryCompanyPage implements OnInit, OnDestroy {

  listOfDeliveryCompanies: any[] | undefined;
  deliveryCompany!:any;
  
  companyName:String="";

  public alertButtons = ['OK'];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private deliverCompanyService:DeliveryCompanyDataService) { }

  ngOnInit() {

    this.getDeliveryCompanies();

    this.dtOptions={
      pagingType:'simple_numbers',
      pageLength:10,
      processing:true
    };
  }

  ngOnDestroy(): void {
    this.dtOptions ={destroy:true}
    this.dtTrigger.unsubscribe();
  }

  public onUpdate(id:any):void{
    this.deliverCompanyService.GetDeliveryCompany(id).subscribe(res=>{
      this.deliveryCompany=res;
      this.companyName=this.deliveryCompany.DeliveryCompanyName;
    })
    
  }

  public alertInputs = [
    {
      placeholder: 'Name',
      value:this.companyName
    },
  ];

  private getDeliveryCompanies():void{
    this.deliverCompanyService.GetDeliveryCompanies().subscribe(res=>{
      this.listOfDeliveryCompanies=res;
      this.dtTrigger.next(null);
    })

  }

}
