import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule,ReactiveFormsModule]
})
export class ChangePasswordPage implements OnInit {

  newPassword: any;
  confirmNewPassword: any;
  PasswordForm!:FormGroup;
  constructor(private alertController: AlertController,private _FB:FormBuilder) { 
    this.PasswordForm= this._FB.group({
      Password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),
      NewPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')])
    },{validators:this.matchpassword('Password','NewPassword')})
  }

  ngOnInit() {
  }

  get f() { return this.PasswordForm.controls }


  changePassword(){
    this.newPassword=this.PasswordForm.get("Password")?.value;

    //send request to backend

  }


  matchpassword(password:any,repassword:any){
    return(formGroup: FormGroup)=>{
      const passcontrol=formGroup.controls[password];
      const repasscontrol=formGroup.controls[repassword];
      if(repasscontrol.errors && !repasscontrol.errors['matchpassword']){ return;}
      if(passcontrol.value !== repasscontrol.value){repasscontrol.setErrors({matchpassword:true});}
      else{ repasscontrol.setErrors(null);}
    };
  }

  async SuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Password updated!.',
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

  reloadPage() {
    window.location.reload()
  }
}