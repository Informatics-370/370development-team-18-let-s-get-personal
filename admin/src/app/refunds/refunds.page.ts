import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { RefundService } from 'src/app/Services/refund.service';
import { Refund } from 'src/app/Models/refund';
import { Refund_Policy } from 'src/app/Models/refundpolicy';
import { Router } from '@angular/router';

//for modal
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-refunds',
  templateUrl: './refunds.page.html',
  styleUrls: ['./refunds.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule]
})
export class RefundsPage implements OnInit {

  filterTerm: string = "";
  filteredpolicies:  Refund_Policy[] = [];
  refundPolicies: Refund_Policy[] =[]
  refunds:Refund[] = [];
  @ViewChild(IonModal) modal!: IonModal
  
  constructor(private service:RefundService, private router: Router, 
    private alertController:AlertController, private modalCtrl: ModalController ) 
  {}  

  ngOnInit(): void {
    this.getPrevRefunds()
  }

  getPrevRefunds(){
    this.service.GetAllPreviousRefunds().subscribe(result =>{
      this.refunds = result as Refund[];
      console.log(this.refunds);
    })
  }

  processRefundsRoute()
  {
    this.router.navigate(['./tabs/process-refund']);
  }

  RefundPolicyRoute()
  {
    this.router.navigate(['./tabs/refund-policies']);
  }

}
