import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { StockTypes } from '../Models/stocktypes';
import { Customer } from '../Models/customer';
import { Response } from '../Models/response';
@Injectable({
    providedIn: 'root' 
  })
  export class CustomerDataService {
  
    apiUrl = 'https://localhost:44390/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
  
    constructor(private httpClient: HttpClient) { 
    }
  
    public GetCustomers(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}Customer/GetAllCustomers`)
      .pipe(map(result => result))
    }
  
    //add
    public AddCustomer(customer:Customer){
      return this.httpClient.post<Response>(`${this.apiUrl}Customer/AddCustomer`, customer)
      .pipe(map(result => result))
    }
  
    //get selected one
    public GetCustomer(Customer_ID:string){ 
      return this.httpClient.get(`${this.apiUrl}Customer/GetCustomer/${Customer_ID}`)
      .pipe(map(result => result))
    }
  
    //edit
    public UpdateCustomer(Customer_ID:string, customer:Customer){
      return this.httpClient.put<Response>(`${this.apiUrl}Customer/UpdateCustomer/${Customer_ID}`, customer)
    }
  
    //delete 
    public DeleteStockType(Customer_ID:string){
      return this.httpClient.delete<Response>(`${this.apiUrl}Customer/DeleteCustomer/${Customer_ID}`)
    }
  
  }