import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, FormGroup, Validators, FormControl, ReactiveFormsModule  } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class ChangepasswordPage implements OnInit {

  data = {newPassword: '', confirmNewPassword: ''};
  constructor(
    private authService: AuthenticationService, 
    private router: Router, 
    private alertController:AlertController) { }

  ngOnInit(): void {
  }

  UpdatePassword(form: NgForm) {
    this.data.newPassword = form.value.newPassword;
    this.data.confirmNewPassword = form.value.confirmNewPassword;
    if(this.data.newPassword == this.data.confirmNewPassword) {
      this.authService.ResetPassword(form.value.Email, 
        this.data.newPassword, 
        this.data.confirmNewPassword)
          .subscribe((res) => {
          this.ChangeSuccessAlert();
          this.router.navigateByUrl('/profile', {replaceUrl: true});
      });
    }
  }

  async ChangeSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Your Password has been updated successfully!',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async ChangeFailedAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Your Password has not been updated successfully',
      message: 'Please try again',
      buttons: ['OK'],
    });
    await alert.present();
  }

}
