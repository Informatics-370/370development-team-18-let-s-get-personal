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
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, RouterModule]
})
export class LoginPage implements OnInit {
  role: any
  data = {username: '', password: '', token: []};
  errorMsg!: string

  constructor(
    private authService: AuthenticationService, private alertController:AlertController, 
    private router: Router, public loadingController: LoadingController) { }

  ngOnInit(): void {

  }

  logMeOutIn(){

  }

  login(form: NgForm) {
    this.presentLoading()
      this.authService.Login(form.value.username, form.value.password).subscribe((res) => {

        this.role = JSON.parse(JSON.stringify(localStorage.getItem('roles')));
        console.log(this.role);
        if(this.role.includes('User')){
          this.ErrorAlert();
        }
        else { //if(roles.includes('Admin'))
          this.router.navigateByUrl('/tabs/order-requests', {replaceUrl: true});
          localStorage.setItem('username', form.value.username,);
          this.FindID()
        }
        // else if (roles.includes('Employee')){
        //   this.router.navigateByUrl('/tabs/orders', {replaceUrl: true});
        //   localStorage.setItem('username', form.value.username,);
        //   this.FindEmployeeID()
        // }
        // else{
        //   this.LoginFailErrorAlert()
        // }          
      },(error) => {
        // Handle login incorrect details error
        this.Alert();
        console.error('Login error:', error);
      });
    
    
  }

  admin!: Admin
  employee!: Employee

  FindID(){
    let username = JSON.parse(JSON.stringify(localStorage.getItem('username')));
    if(this.role.includes('Admin')){
      this.authService.GetAdminID(username).subscribe(result => {
        this.admin = result as Admin
        let userID = this.admin.admin_ID 
        localStorage.setItem('userID', userID);
      },(error) => {
        this.errorMsg = error
        this.LoginFailErrorAlert();
        console.error('Login error:', error);
      });
    }
    else if (this.role.includes('Employee')){
      this.authService.GetEmployeeID(username).subscribe(result => {
        this.employee = result as Employee
        let userID = this.employee.employee_ID 
        localStorage.setItem('userID', userID);
      },(error) => {
        this.errorMsg = error
        this.LoginFailErrorAlert();
        console.error('Login error:', error);
      });
    }  
    else{
      this.LoginFailErrorAlert()
    } 
  }

  // FindEmployeeID(){
  //   let username = JSON.parse(JSON.stringify(localStorage.getItem('username')));
  //   this.authService.GetEmployeeID(username).subscribe(result => {
  //     this.employee = result as Employee
  //     let userID = this.employee.employee_ID 
  //     localStorage.setItem('userID', userID);
  //   })
  // }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please Wait....',
      duration: 3000,
      backdropDismiss: true,
    });
    
    await loading.present();
  
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
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

