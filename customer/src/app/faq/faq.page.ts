import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Refund_Policy } from '../Models/refundpolicy';
import { RefundService } from '../Services/refund.service';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class FaqPage implements OnInit {
  policy: Refund_Policy[] =[]
  constructor(private service: RefundService) { }

  ngOnInit() {
  }

  getRefundPolicy(){
    this.service.GetAllRefundPolicies().subscribe(result => {
      this.policy = result as Refund_Policy[]
    })
  }

}
