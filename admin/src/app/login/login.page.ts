import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Admin } from '../Models/admin';
import { Employee } from '../Models/employee';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, RouterModule]
})
export class LoginPage implements OnInit {

  data = {username: '', password: '', token: []};

  errorMsg!: string
  constructor(
    private authService: AuthenticationService, private alertController:AlertController, 
    private router: Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    
      this.authService.Login(form.value.username, form.value.password).subscribe((res) => {

        let roles = JSON.parse(JSON.stringify(localStorage.getItem('roles')));
        console.log(roles);
        if(roles.includes('User')){
          this.ErrorAlert();
        }
        else if(roles.includes('Admin')){ 
          this.router.navigateByUrl('/tabs/order-requests', {replaceUrl: true});
          localStorage.setItem('username', form.value.username,);
          this.FindAdminID()
        }
        else if (roles.includes('Employee')){
          this.router.navigateByUrl('/tabs/orders', {replaceUrl: true});
          localStorage.setItem('username', form.value.username,);
          this.FindEmployeeID()
        }
        else{
          this.LoginFailErrorAlert()
        }          
      },(error) => {
        // Handle registration error
        this.Alert();
        console.error('Login error:', error);
      });
    
    
  }

  admin!: Admin
  employee!: Employee

  FindAdminID(){
    let username = JSON.parse(JSON.stringify(localStorage.getItem('username')));
    this.authService.GetAdminID(username).subscribe(result => {
      this.admin = result as Admin
      let userID = this.admin.admin_ID 
      localStorage.setItem('userID', userID);
    })
  }

  FindEmployeeID(){
    let username = JSON.parse(JSON.stringify(localStorage.getItem('username')));
    this.authService.GetEmployeeID(username).subscribe(result => {
      this.employee = result as Employee
      let userID = this.employee.employee_ID 
      localStorage.setItem('userID', userID);
    })
  }

  async LoginFailErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      //subHeader: this.errorMsg,
      message: 'Please try again',
      buttons: ['OK'],
    });
    await alert.present();
  }
  
  async ErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Customers cannot access this site',
      buttons: ['OK'],
    });
    await alert.present();
  }
  
async Alert() {
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

}

