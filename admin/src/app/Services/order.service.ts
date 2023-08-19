import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Response } from '../Models/response';
import { OrderLineItemVM } from '../ViewModels/orderlineitemVM';
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

  public GetRequestedOrders(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Order/GetRequestedOrders`)
    .pipe(map((result: any) => result))
  }

  public GetOrdersInProgress(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Order/GetOrdersInProgress`)
    .pipe(map((result: any) => result))
  }

  public AcceptOrder(order_Line_Item_ID:string): Observable<any>{
    return this.httpClient.put<Response>(`${this.apiUrl}Order/AcceptOrder/${order_Line_Item_ID}`, this.httpOptions)
    .pipe(map((result: any) => result))
  }

  public ProcessOrder(order_Line_Item_ID:string): Observable<any>{
    return this.httpClient.put<Response>(`${this.apiUrl}Order/ProcessOrder/${order_Line_Item_ID}`, this.httpOptions)
    .pipe(map((result: any) => result))
  }


  // public GetOrders(): Observable<any>{
  //   return this.httpClient.get(`${this.apiUrl}Order/GetAllOrders`)
  //   .pipe(map((result: any) => result))
  // }

  // public GetAllOrderStatuses(): Observable<any>{
  //   return this.httpClient.get(`${this.apiUrl}OrderRequest/GetAllOrderStatuses`)
  //   .pipe(map((result: any) => result))
  // }

  // public ProcessOrder(OrderID:string): Observable<any>{
  //   return this.httpClient.put<Response>(`${this.apiUrl}Order/ProcessOrder/${OrderID}`, this.httpOptions)
  //   .pipe(map((result: any) => result))
  // }

  // public CompleteOrder(OrderID:string): Observable<any>{
  //   return this.httpClient.put<Response>(`${this.apiUrl}Order/CompleteOrder/${OrderID}`, this.httpOptions)
  //   .pipe(map((result: any) => result))
  // }
}
