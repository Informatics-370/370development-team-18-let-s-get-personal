import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import {ContactUs} from '../Models/contactus';
import {ContactUsService} from 'src/app/Services/contactus.service';
import { AuditTrailService } from '../Services/audittrail.service';
import { AuditTrail } from '../Models/adittrail';
import { OrderService } from '../Services/order.service';
import { OrderLineItemVM } from '../ViewModels/orderlineitemVM';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class HomePage implements OnInit {
  subscribeTimer:any
  timeLeft!: number;
  interval:any;
  messages: ContactUs[] = []
  orderRequests: OrderLineItemVM[] =[]

  constructor(private router:Router, private alertController:AlertController, private service: ContactUsService
    , private trailservice: AuditTrailService, public orderservice: OrderService,) 
  { }

  ngOnInit() {
    this.getMessages()
    this.GetOrdersInProgress()
    //this.timeLeft = 5000
  }

//============== Gets =======
  getMessages(){
    this.service.GetAllMessageRequests().subscribe(data =>{
      this.messages = data as ContactUs[]
    })
  }

  GetOrdersInProgress(){
    //this.presentLoading()
    this.orderservice.GetOrdersInProgress().subscribe(result =>{
      this.orderRequests = result as OrderLineItemVM[]
    })
  }

//============== Replied status update =======
  markAsReplied(contactusID: string){
    let contact = new ContactUs() 
    contact.replied = true

    this.service.UpdateContactUsStatus(contactusID, contact).subscribe(data =>{
      if(data.status == "Success"){
        this.UpdateStatusSuccessAlert()
      }
      else{
        this.UpdateStatusErrorAlert()
      }
    })
  }

//============== Timer =======
  timerForm: FormGroup = new FormGroup({
    time: new FormControl('',[Validators.required])
  })

  observableTimer() {
    const source = timer(1000, this.timeLeft);
    const abc = source.subscribe(val => {
      console.log(val, '-');
      this.subscribeTimer = this.timeLeft - val;
    });
  }

  handleChange(e: any) {
    console.log('ionChange fired with value: ' + e.detail.value);
    this.timeLeft = e.detail.value
    this.observableTimer()
  }

  handleCancel() {
    console.log('ionCancel fired');
  }

  handleDismiss() {
    console.log('ionDismiss fired');
  }


//============== Audit Trail =======
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

//============== Alerts =======
  async HelpAlert() {
    const alert = await this.alertController.create({
      header: '',
      subHeader: '',
      message: '',
      buttons: [{
          text: 'OK',
          role: 'cancel',
      }],
    });
    await alert.present();
  }

  async UpdateStatusSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Contact Us Message Marked as Replied',
      buttons: [{
          text: 'OK',
          role: 'cancel',
          handler:() =>{
            this.reloadPage();
          }
      }],
    });
    await alert.present();
  }

  async UpdateStatusErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are Sorry!',
      subHeader: 'Status not updated please try again',
      buttons: [{
          text: 'OK',
          role: 'cancel',
          handler:() =>{
            this.reloadPage();
          }
      }],
    });
    await alert.present();
  }

  reloadPage(){
    window.location.reload()
  }

  // startTimer() {
  //   this.timeLeft = this.timerForm.value.time

  //   this.interval = setInterval(() => {
  //     if(this.timeLeft > 0) {
  //       this.timeLeft--;
  //     } else {
  //       this.timeLeft = 60;
  //     }
  //   },1000)
  // }

  // pauseTimer() {
  //   clearInterval(this.interval);
  // }


  // <ion-item>
  //           <ion-label position="stacked">Stock Item Type</ion-label><br>
  //           <ion-select placeholder="Select a Stock Type" formControlName="Stock_Type_ID">
  //             <div slot="label">Stock Types <ion-text color="danger">(Required)</ion-text></div>
  //             <ion-select-option *ngFor="let types of stocktypes" value="{{types.stock_Type_ID}}" >
  //               {{types.stock_Type_Name}}
  //             </ion-select-option>
  //           </ion-select>
  //         </ion-item>
}
