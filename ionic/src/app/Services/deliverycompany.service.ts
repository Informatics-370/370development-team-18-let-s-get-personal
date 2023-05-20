import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { StockTypes } from '../Models/stocktypes';

@Injectable({
    providedIn: 'root' 
  })
  export class StockTypeDataService {
  
    apiUrl = 'https://localhost:44390/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
  
    constructor(private httpClient: HttpClient) { 
    }
  
    //return http.loacalhost:5116/api/Course/GetAllStockTypes
    GetDeliveryCompanies(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}DeliveryCompany/GetAllDeliveryCompanies`)
      .pipe(map(result => result))
    }
  
    //add
    AddDeliveryCompany(stocktype:StockTypes){
      return this.httpClient.post(`${this.apiUrl}DeliveryCompany/AddDeliveryCompany`, stocktype)
      .pipe(map(result => result))
    }
  
    //get selected one
    GetDeliveryCompany(StockTypeId:Number){ 
      return this.httpClient.get(`${this.apiUrl}DeliveryCompany/GetDeliveryCompany/${StockTypeId}`)
      .pipe(map(result => result))
    }
  
    //edit
    UpdateDeliveryCompany(StockTypeId:Number, stocktype:StockTypes){
      return this.httpClient.put(`${this.apiUrl}DeliveryCompany/UpdateDeliveryCompany/${StockTypeId}`, stocktype);
      //.pipe(map(result => result))
    }
  
    //delete 
    DeleteDeliveryCompany(StockTypeId:Number){
      return this.httpClient.delete(`${this.apiUrl}DeliveryCompany/DeleteDeliveryCompany/${StockTypeId}`);
      //.pipe(map(result => result))
    }
  
  }