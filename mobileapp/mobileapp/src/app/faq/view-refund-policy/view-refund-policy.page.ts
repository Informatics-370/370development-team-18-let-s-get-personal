import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { Refund_Policy } from 'src/app/Models/refundpolicy';
import { RefundService } from 'src/app/Services/refund.service';
import { Router } from '@angular/router';
import { RefundVM } from 'src/app/ViewModels/refundVM';

@Component({
  selector: 'app-view-refund-policy',
  templateUrl: './view-refund-policy.page.html',
  styleUrls: ['./view-refund-policy.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewRefundPolicyPage implements OnInit {

  refundPolicy: Refund_Policy[] = [];
  policy: RefundVM[]=[];
  
  constructor(private _router: Router,private service: RefundService) { }

  ngOnInit() {
    this.GetAllRefundPolicies();
  }

  public GetAllRefundPolicies() {
    this.service.GetAllRefundPolicies().subscribe(result => {
      this.policy = result as RefundVM[];
      console.log(this.refundPolicy)
    })
  }
  public FAQ() {
    this._router.navigate(["/tabs/faq"])
  }
}
