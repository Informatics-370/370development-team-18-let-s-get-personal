import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { StockTypes } from '../Models/stocktypes';
import { Customer } from '../Models/customer';
import { User } from '../Models/user';

@Injectable({
    providedIn: 'root' 
  })
  export class ProfileService {
  
    apiUrl = 'https://localhost:44390/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
  
    constructor(private httpClient: HttpClient) { }

    public GetAllUsers(): Observable<any> {
      return this.httpClient.get<any>(`${this.apiUrl}UserProfile/GetAllUsers`)
      .pipe(map(res => {
        return res;
      }))
    }

    public GetUserProfile(email: string): Observable<any> {
      return this.httpClient.get<any>(`${this.apiUrl}UserProfile/GetUserByEmail/${email}`)
      .pipe(map(res => {
        return res;
      }))
    }

    public CreateCustomerProfile(customer: Customer): Observable<any> {
      return this.httpClient.post<any>(`${this.apiUrl}UserProfile/AddCustomerUserProfile`, customer)
      .pipe(map(res => {
        return res;
      }))
    }

    public DeleteUser(userId: string): Observable<any> {
      return this.httpClient.delete<any>(`${this.apiUrl}UserProfile/DeleteUser/${userId}`)
      .pipe(map(res => {
        return res;
      }))
    }

    public AssignAsAdmin(user: User): Observable<any> {
      return this.httpClient.post<any>(`${this.apiUrl}UserProfile/register-admin/`, user)
      .pipe(map(res => {
        return res;
      }))
    }
  }