import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { StockTypes } from '../Models/stocktypes';
import { Delivery_Company } from '../Models/deliverycompany';

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
    public GetDeliveryCompanies(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}DeliveryCompany/GetAllDeliveryCompanies`)
      .pipe(map(result => result))
    }
  
    //add
    public AddDeliveryCompany(deliveryCompany:Delivery_Company){
      return this.httpClient.post(`${this.apiUrl}DeliveryCompany/AddDeliveryCompany`, deliveryCompany)
      .pipe(map(result => result))
    }
  
    //get selected one
    public GetDeliveryCompany(deliveryCompanyId:Number){ 
      return this.httpClient.get(`${this.apiUrl}DeliveryCompany/GetDeliveryCompany/${deliveryCompanyId}`)
      .pipe(map(result => result))
    }
  
    //edit
    public UpdateDeliveryCompany(deliveryCompanyId:Number, deliveryCompany:Delivery_Company){
      return this.httpClient.put(`${this.apiUrl}DeliveryCompany/UpdateDeliveryCompany/${deliveryCompanyId}`, deliveryCompany)
      //.pipe(map(result => result))
    }
  
    //delete 
    public DeleteDeliveryCompany(deliveryCompanyId:Number){
      return this.httpClient.delete(`${this.apiUrl}DeliveryCompany/DeleteDeliveryCompany/${deliveryCompanyId}`)
      //.pipe(map(result => result))
    }
  
  }