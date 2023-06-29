import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class LoginPage implements OnInit {

  data = {username: '', password: '', token: []};
  constructor(
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    this.authService.Login(form.value.username, form.value.password).subscribe((res) => {
      let roles = JSON.parse(JSON.stringify(localStorage.getItem('roles')));
      console.log(roles);
      if(roles.includes('Admin')) {
        this.router.navigateByUrl('/inventory', {replaceUrl: true});
      } else if(roles.includes('User')) {
        this.router.navigateByUrl('/shop', {replaceUrl: true});
      }
    });
  }
}