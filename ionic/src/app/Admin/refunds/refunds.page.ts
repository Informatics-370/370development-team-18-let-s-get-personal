import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RefundService } from 'src/app/Services/refund.service';
import { Refund } from 'src/app/Models/refund';
import { Refund_Policy } from 'src/app/Models/refundpolicy';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

//for modal
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-refunds',
  templateUrl: './refunds.page.html',
  styleUrls: ['./refunds.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RefundsPage implements OnInit {
  refundPolicies: Refund_Policy[] =[]
  @ViewChild(IonModal) modal!: IonModal
  constructor(private service:RefundService, private thisroute: Router, public modalCtrl: ModalController ) { }

  AddForm: FormGroup = new FormGroup({
    date: new FormControl('',[Validators.required]),
    version: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required])
  })

  ngOnInit(): void {
    this.getRefundPolicies()
  }

  getRefundPolicies(){
    this.service.GetAllRefundPolicies().subscribe(result =>{
      this.refundPolicies = result as Refund_Policy[];
    })
  }

  AddRefundPolicy(){
    let addRefund = new Refund_Policy();

    addRefund.Refund_Policy_Date = this.AddForm.value.date;
    addRefund.Refund_Policy_Version = this.AddForm.value.version;
    addRefund.Refund_Policy_Description = this.AddForm.value.description;

    this.service.AddRefundPolicy(addRefund).subscribe((response:any) => {
      if(response.statusCode == 200)
      {
        alert(response.message)
        //this.thisroute.navigate(['/'])
      }
      else{
        alert(response.message)
      }
    })
  }

  DeleteRefundPolicy(Refund_Policy_ID: Number){
    this.service.DeleteRefundPolicy(Refund_Policy_ID).subscribe(result => {
      console.log(result);
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
}
