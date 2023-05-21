import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { StockTypes } from '../Models/stocktypes';
import { DeliveryCompany } from '../Models/deliverycompany';

@Injectable({
    providedIn: 'root' 
  })
  export class DeliveryCompanyDataService {
  
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
    AddDeliveryCompany(deliverycompany:DeliveryCompany){
      return this.httpClient.post(`${this.apiUrl}DeliveryCompany/AddDeliveryCompany`, deliverycompany)
      .pipe(map(result => result))
    }
  
    //get selected one
    GetDeliveryCompany(DeliveryCompanyId:Number){ 
      return this.httpClient.get(`${this.apiUrl}DeliveryCompany/GetDeliveryCompany/${DeliveryCompanyId}`)
      .pipe(map(result => result))
    }
  
    //edit
    UpdateDeliveryCompany(DeliveryCompanyId:Number, deliverycompany:DeliveryCompany){
      return this.httpClient.put(`${this.apiUrl}DeliveryCompany/UpdateDeliveryCompany/${DeliveryCompanyId}`, deliverycompany);
      //.pipe(map(result => result))
    }
  
    //delete 
    DeleteDeliveryCompany(DeliveryCompanyId:Number){
      return this.httpClient.delete(`${this.apiUrl}DeliveryCompany/DeleteDeliveryCompany/${DeliveryCompanyId}`);
      //.pipe(map(result => result))
    }
  
  }