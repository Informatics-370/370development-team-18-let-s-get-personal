import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ForgotPasswordPage{
  email!: string;

  constructor(private alertController: AlertController,
    private authService: AuthenticationService) { }

  sendResetLink() {
    this.authService.ForgotPassword(this.email);
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Forgot Password',
      message: 'A reset link has been sent to your email address.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
