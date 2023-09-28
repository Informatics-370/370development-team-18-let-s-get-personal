/*import { Injectable } from '@angular/core';
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
  
}*/


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate{

    constructor(private router:Router){}

    role=localStorage.getItem("roles");
    token=localStorage.getItem("token");

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let url:string=state.url;
        return this.checkLogin(route,url);
    }

    checkLogin(route:ActivatedRouteSnapshot,url:any):boolean{
        if(this.router.url==='/login')
            return true;

            const allowedRoles=route.data['roles'];

        if(this.token){
            if(!allowedRoles.includes(this.role)){
                this.router.navigate(['/login']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}