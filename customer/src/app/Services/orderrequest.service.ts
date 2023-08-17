import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Response } from '../Models/response';
import { DeliveryAddress } from '../Models/deliveryaddress';
import { Delivery } from '../Models/delivery';
import { Order_Request } from '../Models/orderrequest';
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

  public AddDeliveryAdress(da:DeliveryAddress){
    return this.httpClient.post(`${this.apiUrl}OrderRequest/AddDeliveryAdress`, da)
    .pipe(map(result => result))
  }

  public AddDeliveryRequest(d:Delivery){
    return this.httpClient.post(`${this.apiUrl}OrderRequest/AddDeliveryRequest`, d)
    .pipe(map(result => result))
  }

  public AddOrderRequest(or:Order_Request){
    return this.httpClient.post(`${this.apiUrl}OrderRequest/AddOrderRequest`, or)
    .pipe(map(result => result))
  }
}
