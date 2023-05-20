import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { StockTypes } from '../Models/stocktypes';
import { Delivery } from '../Models/delivery';

@Injectable({
    providedIn: 'root' 
  })
  export class StockTypeDataService {
  
    apiUrl = 'http://localhost:5116/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
  
    constructor(private httpClient: HttpClient) { 
    }
  
    //return http.loacalhost:5116/api/Course/GetAllStockTypes
    GetDeliveriess(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}Delivery/GetAllDeliveriesAsync`)
      .pipe(map(result => result))
    }
  
    //add
    AddDelivery(delivery:Delivery){
      return this.httpClient.post(`${this.apiUrl}Delivery/AddDelivery`, delivery)
      .pipe(map(result => result))
    }
  
    //get selected one
    GetDelivery(DeliveryId:Number){ 
      return this.httpClient.get(`${this.apiUrl}Delivery/GetDeliveryDetailsAsync/${DeliveryId}`)
      .pipe(map(result => result))
    }
  
    //edit
    UpdateDelivery(DeliveryId:Number, delivery:Delivery){
      return this.httpClient.put(`${this.apiUrl}Delivery/UpdateDeliveryAsync/${DeliveryId}`, delivery)
      .pipe(map(result => result))
    }
  
    //delete 
    DeleteDelivery(DeliveryId:Number){
      return this.httpClient.delete(`${this.apiUrl}Delivery/DeleteDelivery/${DeliveryId}`)
      .pipe(map(result => result))
    }
  
  }