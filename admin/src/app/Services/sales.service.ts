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

  public GetAllSales(): Observable<any>{ 
    return this.httpClient.get(`${this.apiUrl}Sales/GetAllSales`)
    .pipe(map(result => result))
  } 

  public GetSalesGraph(): Observable<any>{ 
    return this.httpClient.get(`${this.apiUrl}Sales/GetSalesGraph`)
    .pipe(map(result => result))
  } 

  public GetSalesControlBreak(stocktypename: string): Observable<any>{ 
    return this.httpClient.get(`${this.apiUrl}Sales/GetSalesControlBreak/${stocktypename}`)
    .pipe(map(result => result))
  } 

}