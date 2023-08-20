import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Delivery } from '../Models/delivery';
import { Response } from '../Models/response';
import { Delivery_Company } from '../Models/deliverycompany';
import { DeliveryViewModel } from '../ViewModels/deliveryVM';
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
  public GetRequestedDeliveries(): Observable<any>{ 
    return this.httpClient.get(`${this.apiUrl}Deliveries/GetRequestedDeliveries`)
    .pipe(map(result => result))
  }
  
  public SendOutDelivery(delivery_Id:string){
    return this.httpClient.put<Response>(`${this.apiUrl}Deliveries/SendOutDelivery/${delivery_Id}`, this.httpOptions)
  }
  
  public GetOutDeliveries(): Observable<any>{ 
    return this.httpClient.get(`${this.apiUrl}Deliveries/GetOutDeliveries`)
    .pipe(map(result => result))
  }

  public ChangeStatusToRecieved(delivery_Id:string){
    return this.httpClient.put(`${this.apiUrl}Deliveries/ChangeStatusToRecieved/${delivery_Id}`, this.httpOptions)
  }

  public ChangeStatusToFailed(delivery_Id:string){
    return this.httpClient.put<Response>(`${this.apiUrl}Deliveries/ChangeStatusToFailed/${delivery_Id}`, this.httpOptions) 
    //, this.httpOptions
  }

  public GetSuccessfulDeliveries(): Observable<any>{ 
    return this.httpClient.get(`${this.apiUrl}Deliveries/GetSuccessfulDeliveries`)
    .pipe(map(result => result))
  }

  public GetFailedDeliveries(): Observable<any>{ 
    return this.httpClient.get(`${this.apiUrl}Deliveries/GetUnsuccessfulDeliveries`)
    .pipe(map(result => result))
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