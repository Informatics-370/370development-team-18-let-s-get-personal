import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Delivery } from 'src/app/Models/delivery';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DeliveryDataService } from 'src/app/Services/deliveries.service';

import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.page.html',
  styleUrls: ['./deliveries.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class DeliveriesPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal
  deliveries:Delivery[] =[];


  constructor(private service:DeliveryDataService, private alertController:AlertController) { }


  ngOnInit() {
    this.GetDeliveries()

  }

  GetDeliveries(){
    this.service.GetAllDeliveries().subscribe(result => {
      let deliverylist:any[] = result
      deliverylist.forEach((element) => {
        this.deliveries.push(element)
      });
    })
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  canceladdmodal() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirmaddmodal() {
    const alert = await this.alertController.create({
      header: 'Please Confirm that you would like to continue',
      buttons: ['Cancel', 'Continue']
    });
    await alert.present();
    this.modal.dismiss('confirm');
  }

  // deleteDeliveries(DeliveryID: Number){
  //   this.deliveries.DeleteDelivery(DeliveryID).subscribe(result => {
  //     window.location.reload();
  //     });
    }


