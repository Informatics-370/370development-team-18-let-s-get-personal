import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
//import { Md5 } from 'ts-md5';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BasketService } from 'src/app/Services/basket.service';
import { FormBuilder } from '@angular/forms'
@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.page.html',
  styleUrls: ['./make-payment.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MakePaymentPage implements OnInit {

  constructor(private cartService: BasketService, private httpComms : HttpClient, private pageRouter : Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

 // getSignature(data : Map<string, string>) : string {
 //   let tmp = new URLSearchParams();
 //   data.forEach((v, k)=> {
 //     tmp.append(k, v)
  //  });
 //   let queryString = tmp.toString();
    //let sig = Md5.hashStr(queryString);
    //return sig;
 // }

  doFormPayment() {
    let onSiteUserData = new Map<string, string>();
    onSiteUserData.set("merchant_id", "10026206")
    onSiteUserData.set("merchant_key", "wy3z2mq4jknd2")

    onSiteUserData.set('return_url', window.location.origin + '/success')
    onSiteUserData.set('cancel_url', window.location.origin + '/cancel')

    onSiteUserData.set("email_address", 'test@user.com');
    
    onSiteUserData.set("amount", this.cartService.getCurrentBasket().toString());
    //onSiteUserData.set("item_name", this.cartService.getCartOrderName());

    onSiteUserData.set('passphrase', 'HelloWorldHello');

   // let signature = this.getSignature(onSiteUserData);
    //onSiteUserData.set('signature', signature);

    let autoPaymentForm = this.formBuilder.group(onSiteUserData);
    
    this.httpComms.post('https://sandbox.payfast.co.za/eng/process', onSiteUserData).subscribe(resp => {
      console.log(resp);
    });
  }
}
