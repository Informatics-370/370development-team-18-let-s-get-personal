import { Component, OnInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Delivery } from '../Models/delivery';
import { Delivery_Company } from '../Models/deliverycompany';
import { AlertController, IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DeliveryDataService } from '../Services/deliveries.service';
//for modal
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
//Contains: 
@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.page.html',
  styleUrls: ['./deliveries.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule,RouterModule]
})
export class DeliveriesPage implements OnInit {

  searchValue: string ='';
  deliveries:Delivery[]=[];
  filteredDelivery:Delivery[]=[];
  deliverycompanies:Delivery_Company[]=[];

  updateSearchResults() {
    // this.filteredDelivery = this.deliveries.filter((items: { Tracking_Number: number; }) =>
    //  items.Tracking_Number.toString().includes(this.searchValue));
  }

  ngOnInit() {
    this.GetAllDeliveries();
    this.getDeliveryCompany();
  }

  @ViewChild(IonModal) modal!: IonModal
  constructor(private service:DeliveryDataService, private router: Router, public modalCtrl: ModalController,
    private alertController:AlertController) { }

  AddForm: FormGroup = new FormGroup({
    orderLineItemId: new FormControl('',[Validators.required]),
    deliverycompany: new FormControl('',[Validators.required]),
    deliveryprice: new FormControl('',[Validators.required]),
    trackingnumber: new FormControl('',[Validators.required]),
  })
  
  Routedeliverycompanies()
  {
    this.router.navigate(['./tabs/delivery-companies']);
  }

  GetAllDeliveries(){
    // this.service.GetAllDeliveries().subscribe(result =>{
    //   this.deliveries = result as Delivery[];
    //   console.log(this.deliveries)
    // })
  }

  getDeliveryCompany(){
    this.service.GetDeliveryCompanies().subscribe(result =>{
      this.deliverycompanies = result as Delivery_Company[];
      console.log(this.deliverycompanies)
    })
  }


  AddDelivery(){
    // let addDelivery = new Delivery();

    // addDelivery.delivery_Company = this.AddForm.value.deliverycompany;
    // addDelivery.delivery_Price = this.AddForm.value.deliveryprice;
    // addDelivery.tracking_Number = this.AddForm.value.trackingnumber;    

    // this.service.AddDelivery(addDelivery).subscribe(response => {
    //   if(response.status == "Error")
    //   {
    //     this.addDeliveryErrorAlert();
    //   }
    //   else{
    //     this.addDeliverySuccessAlert();
    //   }
    // })
  }

  ReceiveDelivery(DeliveryId: number){
    // this.service.ReceiveDelivery(DeliveryId).subscribe(result => {
    //   console.log(result);
    //   if(result.status == "Error")
    //   {
    //     this.ReceiveDeliveryErrorAlert();
    //   }
    //   else if(result.status == "Success"){
    //     this.ReceiveDeliverySuccessAlert();
    //   }
    // })
  }

  reloadPage(){
    window.location.reload()
  }
  
  canceladdmodal() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmaddmodal() {
    this.AddDelivery();    
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  async addDeliverySuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Delivery Added!',
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

  async addDeliveryErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Delivery Was Not Added',
      message: 'Please try again',
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

  async ReceiveDeliverySuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Delivery Received',
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

  async ReceiveDeliveryErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Delivery Was Not Successfully Received',
      message: 'Please try again',
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

  
}
