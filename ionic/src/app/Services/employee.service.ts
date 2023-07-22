import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';

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

  constructor(private httpClient: HttpClient) { }

  public GetEmployees(): Observable<any>{ 
    return this.httpClient.get(`${this.apiUrl}Employee/GetAllEmployees`)
    .pipe(map(result => result))
  }

  public DeleteEmployee(EmployeeId:Number){
    return this.httpClient.delete(`${this.apiUrl}Employee/DeleteEmployee/${EmployeeId}`)
  }
}
