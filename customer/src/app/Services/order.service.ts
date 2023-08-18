import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Response } from '../Models/response';
import { OrderLineItemVM } from '../ViewModels/orderlineitemVM';
import { Order } from '../Models/orders';
import { OrderT } from '../Models/basket';
import { Order_Line_Item } from '../Models/orderlineitem';
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

  public AddOrderLineItem(oli:Order_Line_Item){
    return this.httpClient.post<Response>(`${this.apiUrl}Order/AddOrderLineItem`, oli)
    .pipe(map(result => result))
  }

  public GetRequestedOrders(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Order/GetRequestedOrders`)
    .pipe(map((result: any) => result))
  }

  public GetOrdersInProgress(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Order/GetOrdersInProgress`)
    .pipe(map((result: any) => result))
  }

  public AcceptOrder(order_Line_Item_ID:number): Observable<any>{
    return this.httpClient.put<Response>(`${this.apiUrl}Order/AcceptOrder/${order_Line_Item_ID}`, this.httpOptions)
    .pipe(map((result: any) => result))
  }

  public ProcessOrder(order_Line_Item_ID:number): Observable<any>{
    return this.httpClient.put<Response>(`${this.apiUrl}Order/ProcessOrder/${order_Line_Item_ID}`, this.httpOptions)
    .pipe(map((result: any) => result))
  }

  public AddOrder(o:Order){
    return this.httpClient.post<Response>(`${this.apiUrl}Order/AddOrder`, o)
    .pipe(map(result => result))
  }

  public placeOrder(order:OrderT):Observable<any>{
    console.log(order);
    return this.httpClient.post(`${this.apiUrl}Order/PlaceOrder`,order,this.httpOptions);
  }
}
