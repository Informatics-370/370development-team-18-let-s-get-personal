import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class LoginPage implements OnInit {

  data = {username: '', password: '', token: []};

  errorMsg!: string
  constructor(
    private authService: AuthenticationService, private alertController:AlertController, 
    private router: Router) { }

  ngOnInit(): void {
  }

  logout(){

  }

  login(form: NgForm) {
    this.authService.Login(form.value.username, form.value.password).subscribe((res) => {
      let roles = JSON.parse(JSON.stringify(localStorage.getItem('roles')));
      console.log(roles);
      if(res.status == "Success"){
        if(roles.includes('user')) {
          this.ErrorAlert();
          this.logout();
        } 
        else{
          this.router.navigateByUrl('/tabs/menu', {replaceUrl: true});
          
        }
      }
      else if(res.status == "Error"){
        this.errorMsg = res.Message;
        this.LoginFailErrorAlert()
      }
      
    });
  }

  async LoginFailErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: this.errorMsg,
      message: 'Please try again',
      buttons: ['OK'],
    });
    await alert.present();
  }
  
  async ErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Customers cannot access this site',
      message: 'Please try again',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
