import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, ModalController, NavController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { ChangePasswordVM } from 'src/app/ViewModels/changepasswordVM';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class OTPPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal
  verificationCode: string = '';

  otp:any;

  ionViewDidEnter() {
   this.otp=localStorage.getItem("otp");

   console.log(this.otp);
  }

  constructor(  private router:Router,private alertController: AlertController,
    private authservice: AuthenticationService,public modalCtrl: ModalController) { }//private navCtrl: NavController, private navParams: NavParams,

  ngOnInit() {
  }

  verifyCode() {
    if(this.otp===this.verificationCode){
      localStorage.removeItem('otp');
      this.SuccessAlert()
      //this.router.navigate(['./tabs/change-password']);
      this.ChangePassword(true);
    }else{
      this.ErrorAlert();
    }
    const codeToVerify = this.verificationCode;
    console.log('code',this.verificationCode)
  }

  //========== Change password ==========
isPassModalOpen = false;
passwordform: FormGroup = new FormGroup({
  // username: new FormControl('',[Validators.required]),
 /* oldpassword: new FormControl('',[Validators.required]),*/
  newpassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),
  confirmpassword:new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),
}, { validators: this.passwordMatchValidator 
  })


passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const newPassword = control.get('newpassword');
  const confirmNewPassword = control.get('confirmpassword');

  if (newPassword && confirmNewPassword && newPassword.value !== confirmNewPassword.value) {
    return { 'passwordMismatch': true };
  }

  return null;
}

get f() { return this.passwordform.controls }

ChangePassword(isOpen: boolean){
  this.isPassModalOpen = isOpen;
}
  confirmpassmodal(){
    /*let username = JSON.parse(JSON.stringify(localStorage.getItem('username')));
    let newpassword = new ChangePasswordVM()
    newpassword.userName = username
    /newpassword.oldPassword = this.passwordform.value.oldpassword/
    newpassword.newPassword = this.passwordform.value.newpassword
    newpassword.confirmPassword = this.passwordform.value.confirmpassword
  
    this.authservice.ChangeUserPassword(newpassword).subscribe(result =>{
      this.editSuccessAlert()
      this.router.navigate(['./tabs/view-profile'])
    },(error) => {
      this.editErrorAlert();        
      console.error('new password:', error);
    })*/
    this.editSuccessAlert()
    this.isPassModalOpen = false;
  }
  
  cancelpassmodal() {
    this.isPassModalOpen = false;
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  async editSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'You have successfully updated your password.',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler:() =>{
          this.router.navigate(['./tabs/login']); 
        }
    }],
    });
    await alert.present();
  }

  async editErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Password Update Failed!',
      /*subHeader: '.',*/
      message: 'Please try again',
      buttons: [{
        text: 'OK',
        role: 'cancel',
       /* handler:() =>{
          this.reloadPage(); 
        }*/
    }],
    });
    await alert.present();
  }

  async SuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Validated!',
      subHeader: 'Proceed to create a new password.',
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
