import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ForgotPasswordPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

<<<<<<< HEAD
=======
  ForgotForm: FormGroup = new FormGroup({
    Username: new FormControl('', [Validators.required])
    //Email: new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]))
  })

  get f() { return this.ForgotForm.controls }

  isLoading: boolean = false;


  CheckEmail(){
    this.isLoading = true;
    
    if (this.ForgotForm.valid) {
      const formData = this.ForgotForm.value;
      console.log('Form',formData);
      let username = new ForgotPasswordViewModel();
      //this.emailcustomer=Object.assign(this.emailcustomer,this.ForgotForm.value);
      username.UserName = this.ForgotForm.value.Username
      
      this.service.ForgotPassword(username).subscribe(result => {
      localStorage.setItem("otp",JSON.stringify(result));
        this.message=result;
        //Swal.fire({position:'center',icon:'success',title:'Successful',text:this.message.message,showConfirmButton: false,timer:1500})
      localStorage.setItem('Username',username.UserName);
       this.SuccessAlert();
        console.log('Customer',username)
        this._router.navigate(['./tabs/otp']);
      },
      (error) => {
        this.ErrorAlert();
        console.error('Username verification error:', error);
      }).add(() => {
        this.isLoading = false; // Stop loading
      });
    }
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
>>>>>>> developer
}
