import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUser: BehaviorSubject<any> = new BehaviorSubject(null);

  apiUrl = 'https://localhost:44390/api/'

    httpOptions ={
    headers: new HttpHeaders({
        ContentType: 'application/json'
    })
    }

    constructor(
    private httpClient: HttpClient,
    private router: Router) { }
    
}