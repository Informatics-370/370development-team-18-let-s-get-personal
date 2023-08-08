import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthenticationService } from '../Services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.page.html',
  styleUrls: ['./admin-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AdminProfilePage implements OnInit {
  public username: string = ""
  constructor(public AuthService:AuthenticationService,private router:Router){}

  ngOnInit() {
    this.getUser()
  }

 
  getUser(){
    this.username = JSON.parse(JSON.stringify(localStorage.getItem('username')));
    // let roles = JSON.parse(JSON.stringify(localStorage.getItem('roles')));
    // localStorage.setItem('username', form.value.username,);
    //this.AuthService.getUser();
  }


  Logout() {
    this.AuthService.Logout();
    // if(localStorage.getItem('Admin'))
    // {
    //   localStorage.removeItem('Admin')
    //   localStorage.removeItem('token');
    //   this.router.navigateByUrl('/login', {replaceUrl: true});
    // }    
    // // this.currentUser.next(false);    
  }

   // logout()
  // {
  //   this.AuthService.Logout();
  //   this.AuthService.islogged = false;
  //   this.router.navigateByUrl("/login");
  // }
  

}
