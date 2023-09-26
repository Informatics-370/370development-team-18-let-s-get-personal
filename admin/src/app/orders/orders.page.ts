import { Component, OnInit, EnvironmentInjector, ViewChild, ElementRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { OrderService } from '../Services/order.service';
import { OrderLineItemVM } from '../ViewModels/orderlineitemVM';
import { LoadingController } from '@ionic/angular'
import { AuditTrailService } from '../Services/audittrail.service';
import { AuditTrail } from '../Models/adittrail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OrdersPage implements OnInit {
  orderRequests: OrderLineItemVM[] =[]
  constructor(private router: Router, public service: OrderService, private alertController:AlertController,
    public loadingController: LoadingController, private trailservice: AuditTrailService ) { }

  ngOnInit() {
    this.GetOrdersInProgress()
  }

  GetOrdersInProgress(){
    this.presentLoading()
    this.service.GetOrdersInProgress().subscribe(result =>{
      this.orderRequests = result as OrderLineItemVM[]
    })
  }
  
  OutForDelivery(order_Line_Item_ID: string){
    try
    {
      this.service.SendOutDelivery(order_Line_Item_ID).subscribe(result =>{
        this.AcceptSuccessAlert()
      },(error) => {
        this.AcceptErrorAlert();        
        console.error('OutForDelivery error:', error);
      })    
      this.AddTrail()
    }
    catch
    {
      this.AcceptErrorAlert()
    }
    
  }

  AddTrail(){
    let audittrail = new AuditTrail()
    let roles = JSON.parse(JSON.stringify(localStorage.getItem('roles'))); //userID
    let userID = JSON.parse(JSON.stringify(localStorage.getItem('userID'))) //JSON.parse(localStorage.getItem('userID') as string)
    let action = "Added order to 'Out For Delivery'"
    
    if(roles == "Admin"){
      audittrail.admin_ID = userID
      audittrail.actionName = action
      this.trailservice.AddAdminAuditTrailItem(audittrail).subscribe(result =>{
        console.log(result)
      })
    }
    else{
      audittrail.employee_ID = userID
      audittrail.actionName = action
      this.trailservice.AddEmployeeAuditTrail(audittrail).subscribe(result =>{
        console.log(result)
      })
    }
  }

  prevOrders()
  {
    this.router.navigate(['./tabs/sales']);
  }

  async presentLoading() {
    
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Click the backdrop to dismiss early...',
      duration: 2000,
      backdropDismiss: true,
      
    });

    if(this.orderRequests.length == 0){
      await loading.present();      
    }
    else{
      await loading.dismiss();
    }   

    const { role, data } = await loading.onDidDismiss();
    
    console.log('Loading dismissed!');
  } 

  async AcceptSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      // subHeader: 'Item Added To Best Seller List',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          this.reloadPage();
        }
      }],
    });
    await alert.present();
  }

  async AcceptErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      // subHeader: 'Item Was Not Added',
      message: 'Please try again',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          this.reloadPage();
        }
      }],
    });
    await alert.present();
  }

  reloadPage() {
    window.location.reload()
  }
}
