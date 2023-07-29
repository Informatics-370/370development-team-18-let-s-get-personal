import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../Services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, HttpClientModule, CommonModule],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  islogged: boolean = true 
  constructor(public AuthService:AuthenticationService,private router:Router){}

  logout()
  {
    this.AuthService.islogged = false;
    this.router.navigateByUrl("/login");
  }
  
  
}
