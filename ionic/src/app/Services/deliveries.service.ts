import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { StockTypes } from '../Models/stocktypes';
import { Delivery } from '../Models/delivery';

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
  
    //return http.loacalhost:5116/api/Course/GetAllStockTypes
    public GetDeliveries(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}Deliveries/GetAllDeliveries`)
      .pipe(map(result => result))
    }
  
    //add
    public AddDelivery(delivery:Delivery){
      return this.httpClient.post(`${this.apiUrl}Deliveries/AddDelivery`, delivery)
      .pipe(map(result => result))
    }
  
    //get selected one
    public GetDelivery(DeliveryId:Number){ 
      return this.httpClient.get(`${this.apiUrl}Deliveries/GetDelivery/${DeliveryId}`)
      .pipe(map(result => result))
    }
  
    //edit
    public UpdateDelivery(DeliveryId:Number, delivery:Delivery){
      return this.httpClient.put(`${this.apiUrl}Deliveries/UpdateDelivery/${DeliveryId}`, delivery)
      .pipe(map(result => result))
    }
  
    //delete 
    public DeleteDelivery(DeliveryId:Number){
      return this.httpClient.delete(`${this.apiUrl}Deliveries/DeleteDelivery/${DeliveryId}`)
      .pipe(map(result => result))
    }
  
  }