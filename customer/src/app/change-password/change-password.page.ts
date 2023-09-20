import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ChangePasswordVM } from '../ViewModels/changepasswordVM';
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
  constructor(private alertController: AlertController,private _FB:FormBuilder, private authservice: AuthenticationService) { 
    this.PasswordForm= this._FB.group({
      OldPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),
      Password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),
      NewPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')])
    },{validators:this.matchpassword('Password','NewPassword')})
  }

  ngOnInit() {
  }

  get f() { return this.PasswordForm.controls }


  changePassword(){
    this.newPassword=this.PasswordForm.get("Password")?.value;

    let changedpassword = new ChangePasswordVM()
    changedpassword.newPassword = this.newPassword
    changedpassword.userName = JSON.parse(JSON.stringify(localStorage.getItem('username')))
    changedpassword.oldPassword = this.PasswordForm.get("OldPassword")?.value

    //send request to backend
    this.authservice.ChangeUserPassword(changedpassword).subscribe(result => {
      if(result.status == "Success"){
        this.SuccessAlert()
      }
      else{
        this.ErrorAlert()
      }
    })

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

  async ErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Password not updated!.',
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