import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Refund } from 'src/app/Models/refund';
import { RefundService } from 'src/app/Services/refund.service';

//for modal
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-process-refund',
  templateUrl: './process-refund.page.html',
  styleUrls: ['./process-refund.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class ProcessRefundPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  
  constructor(private service:RefundService, private thisroute: Router, public modalCtrl: ModalController,
    private alertController:AlertController ) { }


  ngOnInit() {
    
  }

 

  
}
