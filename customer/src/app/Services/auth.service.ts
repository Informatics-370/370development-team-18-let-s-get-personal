import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Response } from '../Models/response';
import { Customer } from '../Models/customer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: BehaviorSubject<any> = new BehaviorSubject(null);

  apiUrl = 'https://localhost:44390/api/'

    httpOptions ={
    headers: new HttpHeaders({
        ContentType: 'application/json'
    })
    }

    islogged: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router) { }

 

  RegisterUser(user: Customer){
    return this.httpClient.post<Response>(`${this.apiUrl}Authentication/Register`, user).pipe(tap(result =>{
      //result.Status == "Success";
      //this.islogged = true;
      this.router.navigateByUrl('/login');
    }))
  }

  LoginUser(user: Customer){
    return this.httpClient.post<Response>(`${this.apiUrl}Authentication/Login`, user).pipe(tap(result =>{
      result.status == "Success";
      this.islogged = true;
      this.router.navigateByUrl('/home');
    }))
  }
    
}