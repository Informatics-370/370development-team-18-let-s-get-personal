import { Component, OnInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Delivery } from '../Models/delivery';
import { Address } from '../Models/address';
import { Delivery_Company } from '../Models/deliverycompany';
import { AlertController, IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DeliveryDataService } from '../Services/deliveries.service';

//for modal
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.page.html',
  styleUrls: ['./deliveries.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class DeliveriesPage implements OnInit {

  searchValue: number =0;
  deliveries:any=Delivery;

  filteredDelivery = this.deliveries.filter((items: { Delivery_Address: Address,Delivery_Company: Delivery_Company,Delivery_Price:number,Tracking_Number: number; }) => 
  items.Tracking_Number.toLowerCase().includes(this.searchValue));


  updateSearchResults() {
    this.filteredDelivery = this.deliveries.filter((items: { Tracking_Number: number; }) =>
     items.Tracking_Number.toLowerCase().includes(this.searchValue.toLowerCase()));
  }
  ngOnInit() {
  }

  @ViewChild(IonModal) modal!: IonModal
  constructor(private service:DeliveryDataService, private thisroute: Router, public modalCtrl: ModalController,
    private alertController:AlertController ) { }

  AddForm: FormGroup = new FormGroup({
    address: new FormControl('',[Validators.required]),
    deliverycompany: new FormControl('',[Validators.required]),
    deliveryprice: new FormControl('',[Validators.required]),
    trackingnumber: new FormControl('',[Validators.required])
  })

  GetAllDeliveries(){
    this.service.GetAllDeliveries().subscribe(result =>{
      this.deliveries = result as Delivery[];
      console.log(this.deliveries)
    })
  }

  AddDelivery(){
    let addDelivery = new Delivery();

    addDelivery.Delivery_Address = this.AddForm.value.address;
    addDelivery.Delivery_Company = this.AddForm.value.deliverycompany;
    addDelivery.Delivery_Price = this.AddForm.value.deliveryprice;
    addDelivery.Tracking_Number = this.AddForm.value.trackingnumber;

    this.service.AddDelivery(addDelivery).subscribe(response => {
      if(response.status == "Error")
      {
        this.addDeliveryErrorAlert();
      }
      else if(response.status == "Success"){
        this.addDeliverySuccessAlert();
      }
    })
  }

  ReceiveDelivery(DeliveryId: Number){
    this.service.ReceiveDelivery(DeliveryId).subscribe(result => {
      console.log(result);
      if(result.status == "Error")
      {
        this.ReceiveDeliveryErrorAlert();
      }
      else if(result.status == "Success"){
        this.ReceiveDeliverySuccessAlert();
      }
    })
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
