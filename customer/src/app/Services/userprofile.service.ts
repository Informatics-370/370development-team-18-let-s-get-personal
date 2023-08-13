import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { StockTypes } from '../Models/stocktypes';
import { Customer } from '../Models/customer';
import { Response } from '../Models/response';
import { Employee } from '../Models/employee';
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
    public GetCustomer(Customer_ID:number){ 
      return this.httpClient.get(`${this.apiUrl}UserProfile/GetCustomer/${Customer_ID}`)
      .pipe(map(result => result))
    }
  
    //edit
    public UpdateCustomer(Customer_ID:number, customer:Customer){
      return this.httpClient.put<Response>(`${this.apiUrl}UserProfile/UpdateCustomer/${Customer_ID}`, customer)
    }
  
  
  }