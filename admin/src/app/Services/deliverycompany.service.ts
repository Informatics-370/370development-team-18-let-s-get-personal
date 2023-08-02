import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Delivery_Company } from '../Models/deliverycompany';
import { Response } from '../Models/response';

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
      return this.httpClient.post<Response>(`${this.apiUrl}DeliveryCompany/AddDeliveryCompany`, deliveryCompany)
      .pipe(map(result => result))
    }
  
    //get selected one
    public GetDeliveryCompany(deliveryCompanyId:string){ 
      return this.httpClient.get(`${this.apiUrl}DeliveryCompany/GetDeliveryCompany/${deliveryCompanyId}`)
      .pipe(map(result => result))
    }
  
    //edit
    public UpdateDeliveryCompany(deliveryCompanyId:string, deliveryCompany:Delivery_Company){
      return this.httpClient.put<Response>(`${this.apiUrl}DeliveryCompany/UpdateDeliveryCompany/${deliveryCompanyId}`, deliveryCompany)
      //.pipe(map(result => result))
    }
  
    //delete 
    public DeleteDeliveryCompany(deliveryCompanyId:string){
      return this.httpClient.delete<Response>(`${this.apiUrl}DeliveryCompany/DeleteDeliveryCompany/${deliveryCompanyId}`)
      //.pipe(map(result => result))
    }
  
  }