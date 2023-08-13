import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, AlertController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, } from '@angular/forms';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.page.html',
  styleUrls: ['./delivery-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DeliveryDetailsPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;

  constructor(private _router: Router, private fb: FormBuilder,
    private alertController: AlertController, private _modalController: ModalController) { }

  ngOnInit() {
  }

  public makepayment() {
    this._router.navigate(["/tabs/make-payment"])
  }

}
