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

  

  public AddOrder(o:Order){
    return this.httpClient.post<Response>(`${this.apiUrl}Order/AddOrder`, o)
    .pipe(map(result => result))
  }

  public placeOrder(order:OrderT):Observable<any>{
    console.log(order);
    return this.httpClient.post(`${this.apiUrl}Order/PlaceOrder`,order,this.httpOptions);
  }
}
