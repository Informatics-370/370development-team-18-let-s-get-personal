import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { ForgotPasswordViewModel } from '../ViewModels/forgotPasswordVM';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class ForgotPasswordPage implements OnInit {

  constructor(private service: AuthenticationService, public loadingController: LoadingController,private alertController: AlertController, private _router: Router) { }

  ngOnInit() {
  }
  ForgotForm: FormGroup = new FormGroup({
    Email: new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]))
  })

  get f() { return this.ForgotForm.controls }

  sendVerificationCode(){

  }
  CheckEmail(){
    // Use a service to send a verification code to the provided email.
  // Implement code to send the code via email.

    if (this.ForgotForm.valid) {
      const formData = this.ForgotForm.value;
      console.log(formData);

      let emailcustomer = new ForgotPasswordViewModel();
      emailcustomer.email_Address = this.ForgotForm.value.Email

      this.service.ForgotPassword(emailcustomer).subscribe(result => {
       //FILL IN CODE TO CHECK EMAIL AND THEN SEND THE OTP PIN IS VALID
       this.SuccessAlert();
        console.log(emailcustomer)
        this._router.navigate(['./tabs/otp']);
      },
      (error) => {
        this.ErrorAlert();
        console.error('Email verification error:', error);
      }
      );
      this.presentLoading();
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Veriffying email...',
      duration: 3000,
      backdropDismiss: true,
    });
  }
  async SuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Verified!',
      subHeader: 'Check your emails for the OTP pin.',
      message: 'Proceed..',
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

  async ErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Email not found!',
      message: 'Ensure that this is the email you used to register your profile. Try again.',
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
  
  reloadPage(){
    window.location.reload()
  }
}
