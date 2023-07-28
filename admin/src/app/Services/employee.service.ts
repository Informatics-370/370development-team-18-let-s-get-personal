import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Employee } from '../Models/employee';
import { Response } from '../Models/response';
@Injectable({
    providedIn: 'root' 
  })
  export class EmployeeService {
  
    apiUrl = 'https://localhost:44390/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
  
    constructor(private httpClient: HttpClient) { 
    }

  //get all
    public GetAllEmployees(): Observable<any>{ 
        return this.httpClient.get(`${this.apiUrl}Employees/GetAllEmployees`)
        .pipe(map(result => result))
    }

 //get selected one
    public GetEmployee(Employee_ID:Number){ 
        return this.httpClient.get(`${this.apiUrl}Employees/GetEmployee/${Employee_ID}`)
        .pipe(map(result => result))
      }

  //add
    public AddEmployee(employee:Employee){
        return this.httpClient.post<Response>(`${this.apiUrl}Employees/AddEmployee`, employee)
        .pipe(map(result => result))
    } 

 //edit
    public UpdateEmployee(Employee_ID:Number, employee:Employee){
        return this.httpClient.put<Response>(`${this.apiUrl}Employees/UpdateEmployee/${Employee_ID}`, employee)
    }

  //delete 
    public DeleteEmployee(Employee_ID:Number){
        return this.httpClient.delete<Response>(`${this.apiUrl}Employees/DeleteEmployee/${Employee_ID}`)
        
    }
   
  
  }