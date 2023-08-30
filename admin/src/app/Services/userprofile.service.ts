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
    public GetAllAdmins(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}UserProfile/GetAllAdmins`)
      .pipe(map(result => result))
    }
  
    public GetAllCustomers(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}UserProfile/GetAllCustomers`)
      .pipe(map(result => result))
    }
  
    //add
    public AddCustomer(customer:Customer){
      return this.httpClient.post<Response>(`${this.apiUrl}UserProfile/AddCustomer`, customer)
      .pipe(map(result => result))
    }
  
    //get selected one
    public GetCustomer(Customer_ID:string){ 
      return this.httpClient.get(`${this.apiUrl}UserProfile/GetCustomer/${Customer_ID}`)
      .pipe(map(result => result))
    }
  
    //edit
    public UpdateCustomer(Customer_ID:string, customer:Customer){
      return this.httpClient.put<Response>(`${this.apiUrl}UserProfile/UpdateCustomer/${Customer_ID}`, customer)
    }
  
    //delete 
    public DeleteCustomer(Customer_ID:string){
      return this.httpClient.delete<Response>(`${this.apiUrl}UserProfile/DeleteCustomer/${Customer_ID}`)
    }

    //get all
    public GetAllEmployees(): Observable<any>{ 
        return this.httpClient.get(`${this.apiUrl}UserProfile/GetAllEmployees`)
        .pipe(map(result => result))
    }

 //get selected one
    public GetEmployee(Employee_ID:string){ 
        return this.httpClient.get(`${this.apiUrl}UserProfile/GetEmployee/${Employee_ID}`)
        .pipe(map(result => result))
      }

  // //add
  //   public AddEmployee(employee:Employee){
  //       return this.httpClient.post<Response>(`${this.apiUrl}UserProfile/AddEmployee`, employee)
  //       .pipe(map(result => result))
  //   } 

 //edit
    public UpdateEmployee(Employee_ID:string, employee:Employee){
        return this.httpClient.put<Response>(`${this.apiUrl}UserProfile/UpdateEmployee/${Employee_ID}`, employee)
    }

  //delete 
    public DeleteEmployee(Employee_ID:string){
        return this.httpClient.delete<Response>(`${this.apiUrl}UserProfile/DeleteEmployee/${Employee_ID}`)        
    }
  
  }