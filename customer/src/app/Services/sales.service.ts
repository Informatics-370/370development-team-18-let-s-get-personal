import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Response } from '../Models/response';
import { Payment } from '../Models/payment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  apiUrl = 'https://localhost:44390/api/'
  
  httpOptions ={
    headers: new HttpHeaders({
    ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  public AddSale(payment:Payment){
    return this.httpClient.post<Response>(`${this.apiUrl}Sales/AddSale`, payment)
    .pipe(map(result => result))
  }
}