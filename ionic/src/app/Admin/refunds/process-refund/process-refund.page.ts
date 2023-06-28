import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RefundService } from 'src/app/Services/refund.service';
import { Refund } from 'src/app/Models/refund';
import { Refund_Policy } from 'src/app/Models/refundpolicy';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RefundVM } from 'src/app/ViewModels/refundVM';

@Component({
  selector: 'app-process-refund',
  templateUrl: './process-refund.page.html',
  styleUrls: ['./process-refund.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ProcessRefundPage implements OnInit {
  refundPolicies: Refund_Policy[] =[]

  constructor(private service:RefundService, private thisroute: Router ) { }

  AddForm: FormGroup = new FormGroup({
    Customer_ID: new FormControl('',[Validators.required]),
    Refund_Reason: new FormControl('',[Validators.required]),
    Refund_Comment: new FormControl('',[Validators.required]),
    Refund_Status: new FormControl('',[Validators.required]),
    Refund_Policy: new FormControl('',[Validators.required])
  })


  ngOnInit():void {

  }
  
  processRefund(){
    let addRefund = new RefundVM();
    addRefund.Customer_ID = this.AddForm.value.Customer_ID;
    addRefund.Refund_Comment = this.AddForm.value.Refund_Comment;
    addRefund.Refund_Policy = this.AddForm.value.Refund_Policy;
    addRefund.Refund_Status = this.AddForm.value.Refund_Status;
    addRefund.Refund_Reason = this.AddForm.value.Refund_Reason;
    
    this.service.AddRefund(addRefund).subscribe((response:any) => {
      if(response.statusCode == 200)
      {
        alert(response.message)
        //this.thisroute.navigate(['/'])
      }
      else{
        alert(response.message)
      }
    }
    )
  }

}
