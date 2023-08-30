import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, HttpClientModule, RouterModule],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  //islogged: boolean = true 
  user: string = ""
  constructor(private router: Router) {}
  reloadPage() {
    window.location.reload()
  }

  CheckUser(){
    this.user = JSON.parse(JSON.stringify(localStorage.getItem('roles')));
    console.log(this.user)
    if (this.user === "User"){
      this.router.navigate(['./tabs/view-profile']);
    }
    else{
      this.router.navigate(['./tabs/login']);
    }
  }
  
}
