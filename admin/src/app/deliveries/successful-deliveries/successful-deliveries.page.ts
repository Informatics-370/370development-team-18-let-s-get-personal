import { Component, OnInit, ViewChild, EnvironmentInjector, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Delivery } from 'src/app/Models/delivery';
import { DeliveryDataService } from 'src/app/Services/deliveries.service';
import { DeliveryViewModel } from 'src/app/ViewModels/deliveryVM';
@Component({
  selector: 'app-successful-deliveries',
  templateUrl: './successful-deliveries.page.html',
  styleUrls: ['./successful-deliveries.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SuccessfulDeliveriesPage implements OnInit {

  deliveries: DeliveryViewModel[] =[]
  date: any
  constructor(private service: DeliveryDataService) { }

  ngOnInit() {
    this.getSuccessfulDeliveries()
  }

  getSuccessfulDeliveries()
  {
    this.service.GetSuccessfulDeliveries().subscribe(result =>{
      this.deliveries = result as DeliveryViewModel[]
      console.log(this.deliveries)      
    })
  }



}
