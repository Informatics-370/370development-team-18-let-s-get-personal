import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Response } from '../Models/response';
import { Address } from '../Models/address';

@Injectable({
    providedIn: 'root' 
  })
  export class AddressDataService {
  
    apiUrl = 'https://localhost:44390/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
  
    constructor(private httpClient: HttpClient) { 
    }
  
    public GetProvinces(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}Address/GetProvinces`)
      .pipe(map(result => result))
    }
}