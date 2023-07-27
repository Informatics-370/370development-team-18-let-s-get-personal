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
  @ViewChild(IonModal) modal!: IonModal
  constructor(private service:RefundService, private thisroute: Router, 
    private alertController:AlertController, private modalCtrl: ModalController ) { }

  AddForm: FormGroup = new FormGroup({
    date: new FormControl('',[Validators.required]),
    version: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required])
  })

  ngOnInit(): void {
    this.getRefundPolicies()
    
    if(this.filterTerm==""){
      this.filteredpolicies = this.refundPolicies;
    }
  }
  search(){
    //empty array
    this.filteredpolicies = [];

    //filter items
    this.filteredpolicies = this.refundPolicies.filter((searchitem)=>
      searchitem.refund_Policy_Date.toDateString().includes(this.filterTerm)||
      searchitem.refund_Policy_Description.toLocaleLowerCase().includes(this.filterTerm.toLocaleLowerCase())||
      searchitem.refund_Policy_Version == Number(this.filterTerm)
    );
   }
   getRefundPolicies(){
    this.service.GetAllRefundPolicies().subscribe(result =>{
      this.refundPolicies = result as Refund_Policy[];
      console.log(this.refundPolicies);
    })
  }

  AddRefundPolicy(){
    let addRefund = new Refund_Policy();

    addRefund.refund_Policy_Date = this.AddForm.value.date;
    addRefund.refund_Policy_Version = this.AddForm.value.version;
    addRefund.refund_Policy_Description = this.AddForm.value.description;

    this.service.AddRefundPolicy(addRefund).subscribe(response => {
      if(response.status == "Success"){
        this.addPolicySuccessAlert();            
      }
      else if (response.status == "Error"){
        this.addPolicyErrorAlert();
      }
    })
  }
  DeleteRefundPolicy(refund_Policy_ID: Number){
    this.service.DeleteRefundPolicy(refund_Policy_ID).subscribe(result => {
      console.log(result);   
      if(result.status == "Success"){
        this.DeletePolicySuccessAlert();            
      }
      else if (result.status == "Error"){
        this.DeletePolicyErrorAlert();
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
    this.AddRefundPolicy();    
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  async addPolicySuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Policy Added',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler:() =>{
            this.reloadPage();
          }
        }
    ],
      
    });
    await alert.present();    
  }

  async addPolicyErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Policy Was Not Added',
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
  async DeletePolicySuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Policy Deleted',
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

  async DeletePolicyErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Policy Was Not Deleted',
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