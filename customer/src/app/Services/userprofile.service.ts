import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Customer } from '../Models/customer';
import { Response } from '../Models/response';
@Injectable({
    providedIn: 'root' 
  })
  export class UserProfileDataService {
  
    apiUrl = 'https://localhost:44390/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
  
    constructor(private httpClient: HttpClient) { 
    }
    
    //get selected one
    public GetCustomer(customer_ID:string){ 
      return this.httpClient.get(`${this.apiUrl}UserProfile/GetCustomerUserProfile/${customer_ID}`)
      .pipe(map(result => result))
    }
  
    //edit
    public UpdateCustomer(customer_ID:string, customer:Customer){
      return this.httpClient.put<Response>(`${this.apiUrl}UserProfile/UpdateCustomerUserProfile/${customer_ID}`, customer)
    }

    //delete 
    public DeleteCustomer(customer_ID:string){
      return this.httpClient.delete<Response>(`${this.apiUrl}UserProfile/DeleteCustomerUser/${customer_ID}`)        
  }
  
  
  }