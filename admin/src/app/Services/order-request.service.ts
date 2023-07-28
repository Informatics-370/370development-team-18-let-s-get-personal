import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Response } from '../Models/response';
@Injectable({
  providedIn: 'root'
})
export class OrderRequestService {

  apiUrl = 'https://localhost:44390/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
    
  constructor(private httpClient: HttpClient) { }

  public GetOrderRequests(): Observable<any>{ 
    return this.httpClient.get(`${this.apiUrl}OrderRequest/GetAllOrderRequests`)
    .pipe(map((result: any) => result))
  }

  public AcceptOrderRequest(OrderRequestID:Number){
    return this.httpClient.put<Response>(`${this.apiUrl}OrderRequest/AcceptOrderRequest/${OrderRequestID}`, this.httpOptions)
  }

  public RejectOrderRequest(OrderRequestID:Number){
    return this.httpClient.put<Response>(`${this.apiUrl}OrderRequest/RejectOrderRequest/${OrderRequestID}`, this.httpOptions)
  }
}
