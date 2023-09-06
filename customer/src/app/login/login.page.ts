import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule,AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { Customer } from '../Models/customer';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, RouterModule]
})
export class LoginPage implements OnInit {
  user: string = ""
  data = { username: '', password: '', token: [] };
  customer!: Customer
  constructor(private authService: AuthenticationService, private router: Router,private alertController: AlertController) { }

  ngOnInit(): void {
    this.CheckUser()
  }

  // ngAfterViewInit(): void{
  //   this.CheckUser()
  // }

  login(form: NgForm) {
    this.authService.Login(form.value.username, form.value.password).subscribe((res) => {
      let roles = JSON.parse(JSON.stringify(localStorage.getItem('roles')));
      console.log(roles);
      if (roles.includes('Admin')) {
        this.router.navigateByUrl('/home', { replaceUrl: true });
      }
      else if (roles.includes('User')) {
        localStorage.setItem('username', form.value.username,);
        this.router.navigateByUrl('tabs/basket'); //, {replaceUrl: true}
        this.FindID()
      }
    },
    (error) => {
      // Handle registration error
      this.ErrorAlert();
      console.error('Login error:', error);
    });
      /*if (error.status === 401) {
        this.showToast('Invalid username or password');
    } else if (error.status === 500) {
        this.showToast('An error occurred on the server');
    } else {
        this.showToast('An unexpected error occurred');
    }
    return throwError(error);*/
  }

  async ErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Oops!',
      subHeader: 'Error',
      message: 'Invalid username or password.',
      buttons: [{
        text: 'OK',
        role: 'cancel'
      }],
    });
    await alert.present();
  }

  FindID() {
    let username = JSON.parse(JSON.stringify(localStorage.getItem('username')));
    this.authService.GetCustomerID(username).subscribe(result => {
      this.customer = result as Customer
      let customerID = this.customer.customer_ID
      localStorage.setItem('customerID', customerID);
    })
  }



  CheckUser(){
    this.user = JSON.parse(JSON.stringify(localStorage.getItem('roles')));
    console.log(this.user)
    if (this.user === "User") {
      this.router.navigate(['./tabs/view-profile']);
    }
    else {

    }
  }

  CreateProfileNav() {
    this.router.navigate(['./tabs/create-profile']);
  }

  ForgotPasswordNav() {
    this.router.navigate(['./tabs/forgot-password']);
  }

  reloadPage() {
    window.location.reload()
  }
}
