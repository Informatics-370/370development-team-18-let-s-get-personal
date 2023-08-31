import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { StockTypes } from '../Models/stocktypes';
import { Customer } from '../Models/customer';
import { Response } from '../Models/response';
import { Employee } from '../Models/employee';
import { Admin } from '../Models/admin';
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
    public GetAdminDetails(admin_ID:string){ 
      return this.httpClient.get(`${this.apiUrl}UserProfile/GetAdminDetails/${admin_ID}`)
      .pipe(map(result => result))
    }

    public UpdateAdmin(admin_ID:string, admin:Admin){
      return this.httpClient.put<Response>(`${this.apiUrl}UserProfile/UpdateAdmin/${admin_ID}`, admin)
    }
  
    public GetAllCustomers(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}UserProfile/GetAllCustomers`)
      .pipe(map(result => result))
    }

    //get all
    public GetAllEmployees(): Observable<any>{ 
        return this.httpClient.get(`${this.apiUrl}UserProfile/GetAllEmployees`)
        .pipe(map(result => result))
    }

 //get selected one
    public GetEmployee(employee_ID:string){ 
        return this.httpClient.get(`${this.apiUrl}UserProfile/GetEmployee/${employee_ID}`)
        .pipe(map(result => result))
      }

 //edit
    public UpdateEmployee(employee_ID:string, employee:Employee){
        return this.httpClient.put<Response>(`${this.apiUrl}UserProfile/UpdateEmployee/${employee_ID}`, employee)
    }

  //delete 
    public DeleteEmployee(employee_ID:string){
        return this.httpClient.delete<Response>(`${this.apiUrl}UserProfile/DeleteEmployee/${employee_ID}`)        
    }
  
  }