import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DeliveryCompany } from 'src/app/Models/deliverycompany';
import { StockTypeDataService } from 'src/app/Services/stocktype.service';
import { AlertController } from '@ionic/angular';
import { FormsModule, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//for modal
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-edit-deliverycompany',
  templateUrl: './edit-deliverycompany.page.html',
  styleUrls: ['./edit-deliverycompany.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class EditDeliverycompanyPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
