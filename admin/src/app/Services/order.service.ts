import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Response } from '../Models/response';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = 'https://localhost:44390/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
    
  constructor(private httpClient: HttpClient) { }

  public GetOrders(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Order/GetAllOrders`)
    .pipe(map((result: any) => result))
  }

  public GetAllOrderStatuses(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}OrderRequest/GetAllOrderStatuses`)
    .pipe(map((result: any) => result))
  }

  public ProcessOrder(OrderID:Number): Observable<any>{
    return this.httpClient.put<Response>(`${this.apiUrl}Order/ProcessOrder/${OrderID}`, this.httpOptions)
    .pipe(map((result: any) => result))
  }

  public CompleteOrder(OrderID:Number): Observable<any>{
    return this.httpClient.put<Response>(`${this.apiUrl}Order/CompleteOrder/${OrderID}`, this.httpOptions)
    .pipe(map((result: any) => result))
  }
}
