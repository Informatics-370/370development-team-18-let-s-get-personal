import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Delivery } from '../Models/delivery';
import { Response } from '../Models/response';
import { Delivery_Company } from '../Models/deliverycompany';

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
  
  constructor(private httpClient: HttpClient) { }
    
  //************* Deliveries *************\\
  public GetAllDeliveries(): Observable<any>{ 
    return this.httpClient.get(`${this.apiUrl}Deliveries/GetAllDeliveries`)
    .pipe(map(result => result))
  }
  
  public AddDelivery(delivery:Delivery){
    return this.httpClient.post<Response>(`${this.apiUrl}Deliveries/AddDelivery`, delivery)
    .pipe(map(result => result))
  }
  
  public GetDelivery(deliveryId:string){ 
    return this.httpClient.get(`${this.apiUrl}Deliveries/GetDelivery/${deliveryId}`)
    .pipe(map(result => result))
  }
    
  public UpdateDelivery(deliveryId:string, delivery:Delivery){
    return this.httpClient.put<Response>(`${this.apiUrl}Deliveries/UpdateDelivery/${deliveryId}`, delivery)
  }
  
  public ReceiveDelivery(deliveryId:string){
    return this.httpClient.delete<Response>(`${this.apiUrl}Deliveries/ReceiveDelivery/${deliveryId}`)
  }

  //************* Delivery Companies *************\\
  public GetDeliveryCompanies(): Observable<any>{ 
    return this.httpClient.get(`${this.apiUrl}Deliveries/GetAllDeliveryCompanies`)
    .pipe(map(result => result))
  }
  
  public AddDeliveryCompany(deliveryCompany:Delivery_Company){
    return this.httpClient.post<Response>(`${this.apiUrl}Deliveries/AddDeliveryCompany`, deliveryCompany)
    .pipe(map(result => result))
  }
  
  public GetDeliveryCompany(deliveryCompanyId:string){ 
    return this.httpClient.get(`${this.apiUrl}Deliveries/GetDeliveryCompany/${deliveryCompanyId}`)
    .pipe(map(result => result))
  }
  
  public UpdateDeliveryCompany(deliveryCompanyId:string, deliveryCompany:Delivery_Company){
    return this.httpClient.put<Response>(`${this.apiUrl}Deliveries/UpdateDeliveryCompany/${deliveryCompanyId}`, deliveryCompany)
  }

  public DeleteDeliveryCompany(deliveryCompanyId:string){
    return this.httpClient.delete<Response>(`${this.apiUrl}Deliveries/DeleteDeliveryCompany/${deliveryCompanyId}`)
  }
  
}