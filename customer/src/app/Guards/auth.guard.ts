import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, filter, map, take } from 'rxjs';
import { AuthenticationService } from '../Services/authentication.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private alertCtrl: AlertController
  ) { }

  public canActivate(route: ActivatedRouteSnapshot) {
    const expectedRole = route.data?.['role'] || null;
    return this.authService.getUser().pipe(
      filter(val => val !== null),
      take(1),
      map(user => {
        if (!user) {
          this.showAlert();
          return this.router.parseUrl('/')
        } else {
          let roles = user['roles'];
          if (!expectedRole || roles.includes(expectedRole)) {
            return true;
          } else {
            this.showAlert();
            return false;
          }
        }
      })
    )
  }

async showAlert() {
  let alert = await this.alertCtrl.create({
    header: 'Unauthorized',
    message: 'You are not authorized to visit that page!',
    buttons: ['OK']
  });
  alert.present();
}
  
}
