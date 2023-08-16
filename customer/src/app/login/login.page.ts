import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, RouterModule]
})
export class LoginPage implements OnInit {
  user: string = ""
  data = {username: '', password: '', token: []};

  constructor( private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.CheckUser()
  }

  login(form: NgForm) {
    this.authService.Login(form.value.username, form.value.password).subscribe((res) => {
      let roles = JSON.parse(JSON.stringify(localStorage.getItem('roles')));
      console.log(roles);
      if(roles.includes('Admin')) 
      {
        this.router.navigateByUrl('/home', {replaceUrl: true});
      } 
      else if(roles.includes('User')) 
      {        
        localStorage.setItem('username', form.value.username,);
        this.router.navigateByUrl('tabs/basket', {replaceUrl: true});
      }
    });
  }

  CheckUser(){
    this.user = JSON.parse(JSON.stringify(localStorage.getItem('username')));
    if (this.user = ""){

    }
    else{
      this.router.navigate(['./tabs/view-profile']);
    }
  }

  CreateProfileNav()
  {
    this.router.navigate(['./tabs/create-profile']);
  }

  ForgotPasswordNav()
  {
    this.router.navigate(['./tabs/forgot-password']);
  }
}
