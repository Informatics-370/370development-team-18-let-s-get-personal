import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Delivery } from '../Models/delivery';
import { Response } from '../Models/response';
import { Delivery_Company } from '../Models/deliverycompany';
import { DeliveryVM } from '../ViewModels/deliveryVM';
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
  // public GetRequestedDeliveries(): Observable<any>{ 
  //   return this.httpClient.get(`${this.apiUrl}Deliveries/GetRequestedDeliveries`)
  //   .pipe(map(result => result))
  // }
  
  // public SendOutDelivery(delivery_Id:number, delivery:DeliveryVM){
  //   return this.httpClient.put<Response>(`${this.apiUrl}Deliveries/SendOutDelivery/${delivery_Id}`, delivery)
  // }
  
  // public GetOutDeliveries(): Observable<any>{ 
  //   return this.httpClient.get(`${this.apiUrl}Deliveries/GetOutDeliveries`)
  //   .pipe(map(result => result))
  // }

  // public ChangeStatusToRecieved(delivery_Id:number, delivery:DeliveryVM){
  //   return this.httpClient.put<Response>(`${this.apiUrl}Deliveries/ChangeStatusToRecieved/${delivery_Id}`, delivery)
  // }

  // public ChangeStatusToFailed(delivery_Id:number, delivery:DeliveryVM){
  //   return this.httpClient.put<Response>(`${this.apiUrl}Deliveries/ChangeStatusToFailed/${delivery_Id}`, delivery) 
  //   //, this.httpOptions
  // }

  // public GetSuccessfulDeliveries(): Observable<any>{ 
  //   return this.httpClient.get(`${this.apiUrl}Deliveries/GetSuccessfulDeliveries`)
  //   .pipe(map(result => result))
  // }

  // public GetFailedDeliveries(): Observable<any>{ 
  //   return this.httpClient.get(`${this.apiUrl}Deliveries/GetUnsuccessfulDeliveries`)
  //   .pipe(map(result => result))
  // }

  //************* Delivery Companies *************\\
  public GetDeliveryCompanies(): Observable<any>{ 
    return this.httpClient.get(`${this.apiUrl}Deliveries/GetAllDeliveryCompanies`)
    .pipe(map(result => result))
  }
  
  // public AddDeliveryCompany(deliveryCompany:Delivery_Company){
  //   return this.httpClient.post<Response>(`${this.apiUrl}Deliveries/AddDeliveryCompany`, deliveryCompany)
  //   .pipe(map(result => result))
  // }
  
  public GetDeliveryCompany(deliveryCompanyId:number){ 
    return this.httpClient.get(`${this.apiUrl}Deliveries/GetDeliveryCompany/${deliveryCompanyId}`)
    .pipe(map(result => result))
  }
  
  // public UpdateDeliveryCompany(deliveryCompanyId:number, deliveryCompany:Delivery_Company){
  //   return this.httpClient.put<Response>(`${this.apiUrl}Deliveries/UpdateDeliveryCompany/${deliveryCompanyId}`, deliveryCompany)
  // }

  // public DeleteDeliveryCompany(deliveryCompanyId:number){
  //   return this.httpClient.delete<Response>(`${this.apiUrl}Deliveries/DeleteDeliveryCompany/${deliveryCompanyId}`)
  // }
  
}