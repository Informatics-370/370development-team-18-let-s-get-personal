import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Delivery } from '../Models/delivery';
import { Response } from '../Models/response';

@Injectable({
    providedIn: 'root' 
  })
  export class DeliveryDataService {
  
    apiUrl = 'https://localhost:44390/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
  
    constructor(private httpClient: HttpClient) { 
    }
  
    public GetAllDeliveries(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}Deliveries/GetAllDeliveries`)
      .pipe(map(result => result))
    }
  
    //add
    public AddDelivery(delivery:Delivery){
      return this.httpClient.post<Response>(`${this.apiUrl}Deliveries/AddDelivery`, delivery)
      .pipe(map(result => result))
    }
  
    //get selected one
    public GetDelivery(DeliveryId:Number){ 
      return this.httpClient.get(`${this.apiUrl}Deliveries/GetDelivery/${DeliveryId}`)
      .pipe(map(result => result))
    }
  
    /*
    public UpdateDelivery(DeliveryId:Number, delivery:Delivery){
      return this.httpClient.put(`${this.apiUrl}Deliveries/UpdateDelivery/${DeliveryId}`, delivery)
    }*/
  
    //receive 
    public ReceiveDelivery(DeliveryId:Number){
      return this.httpClient.delete<Response>(`${this.apiUrl}Deliveries/ReceiveDelivery/${DeliveryId}`)
    }
  
  }