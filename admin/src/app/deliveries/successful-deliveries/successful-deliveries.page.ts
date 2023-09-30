import { Component, OnInit, ViewChild, EnvironmentInjector, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Delivery } from 'src/app/Models/delivery';
import { DeliveryDataService } from 'src/app/Services/deliveries.service';
import { DeliveryViewModel } from 'src/app/ViewModels/deliveryVM';
import { AuditTrailService } from 'src/app/Services/audittrail.service';
import { AuditTrail } from 'src/app/Models/adittrail';

@Component({
  selector: 'app-successful-deliveries',
  templateUrl: './successful-deliveries.page.html',
  styleUrls: ['./successful-deliveries.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class SuccessfulDeliveriesPage implements OnInit {
  faileddeliveries: DeliveryViewModel[] =[]
  deliveries: DeliveryViewModel[] =[]
  date: any
  constructor(private service: DeliveryDataService, private router: Router, private trailservice: AuditTrailService) { }

  isLoading: boolean = false;
  ngOnInit() {
    this.isLoading=true;
    this.getSuccessfulDeliveries()
    this.getFailedDeliveries()
  }

  getSuccessfulDeliveries()
  {
    this.service.GetSuccessfulDeliveries().subscribe(result =>{
      this.deliveries = result as DeliveryViewModel[]
      console.log(this.deliveries) 
      this.isLoading=false;     
    })
  }

  getFailedDeliveries(){
    this.service.GetFailedDeliveries().subscribe(result =>{
      this.faileddeliveries = result as DeliveryViewModel[]
      console.log(this.deliveries)  
      /*this.isLoading= false; */   
    })
  }

  deliveriesnav()
  {
    this.router.navigate(['./tabs/deliveries']);
  }

  RouteDeliveriesControlBreak()
  {
    this.router.navigate(['./tabs/delivery-prices']);
  }

  uploadWayBill(dateDelivered: Date){
    this.action = "Uploaded waybill for delivery delivered on the " + dateDelivered
    this.AddTrail()
  }

  selectedFile!: File;

  onFileSelected(event: any, deliveryid: string) {    
    this.selectedFile = event.target.files[0];

    const formData = new FormData();
    formData.append('pdf', this.selectedFile);
    formData.append('fileName', deliveryid);
    this.service.UploadWaybill(formData, deliveryid).subscribe(data => {

    });
  }

  action!: string
  AddTrail(){
    let audittrail = new AuditTrail()
    let roles = JSON.parse(JSON.stringify(localStorage.getItem('roles'))); //userID
    let userID = JSON.parse(JSON.stringify(localStorage.getItem('userID'))) //JSON.parse(localStorage.getItem('userID') as string)

    
    if(roles == "Admin"){
      audittrail.admin_ID = userID
      audittrail.actionName = this.action
      this.trailservice.AddAdminAuditTrailItem(audittrail).subscribe(result =>{
        console.log(result)
      })
    }
    else{
      audittrail.employee_ID = userID
      audittrail.actionName = this.action
      this.trailservice.AddEmployeeAuditTrail(audittrail).subscribe(result =>{
        console.log(result)
      })
    }
  }

}
