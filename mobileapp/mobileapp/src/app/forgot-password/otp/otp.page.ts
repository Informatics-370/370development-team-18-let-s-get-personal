import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, NavController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OTPPage implements OnInit {

  verificationCode: string = '';

  otp:any;

  ionViewDidEnter() {
   this.otp=localStorage.getItem("otp");

   console.log(this.otp);
  }

  constructor(  private router:Router,private alertController: AlertController) { }//private navCtrl: NavController, private navParams: NavParams,

  ngOnInit() {
  }

  verifyCode() {
    if(this.otp===this.verificationCode){
      localStorage.removeItem('otp');
      this.SuccessAlert()
      this.router.navigate(['./tabs/change-password']);
    }else{
      this.ErrorAlert();
    }
    const codeToVerify = this.verificationCode;
    console.log('code',this.verificationCode)
  }

  async SuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Validated!',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        /*handler: () => {
          this.reloadPage();
        }*/
      }],
    });
    await alert.present();
  }

  async ErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Invalid!',
      subHeader: 'OTP pin invalid!',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          this.reloadPage();
        }
      }],
    });
    await alert.present();
  }
  reloadPage() {
    window.location.reload()
  }

}
