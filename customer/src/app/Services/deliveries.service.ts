import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
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
  
  //************* Delivery Companies *************\\
  public GetDeliveryCompanies(): Observable<any>{ 
    return this.httpClient.get(`${this.apiUrl}Deliveries/GetAllDeliveryCompanies`)
    .pipe(map(result => result))
  }
  
  public GetDeliveryCompany(deliveryCompanyId:string){ 
    return this.httpClient.get(`${this.apiUrl}Deliveries/GetDeliveryCompany/${deliveryCompanyId}`)
    .pipe(map(result => result))
  }
  
}