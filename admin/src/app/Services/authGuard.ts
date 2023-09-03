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
                this.router.navigate(['/tabs/profiles']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}