import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuditTrail } from '../Models/adittrail';
import { Response } from '../Models/response';

@Injectable({
  providedIn: 'root'
})
export class AuditTrailService {

  apiUrl = 'https://localhost:44390/api/'
  
  httpOptions ={
    headers: new HttpHeaders({
    ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  public GetAdminAuditTrails(): Observable<any>{ 
    return this.httpClient.get(`${this.apiUrl}AuditTrail/GetAdminAuditTrails`)
    .pipe(map(result => result))
  }

  public AddAdminAuditTrailItem(trail:AuditTrail){
    return this.httpClient.post<Response>(`${this.apiUrl}AuditTrail/AddAdminAuditTrail`, trail, this.httpOptions)
  }

  public GetEmployeeAuditTrails(): Observable<any>{ 
    return this.httpClient.get(`${this.apiUrl}AuditTrail/GetEmployeeAuditTrails`)
    .pipe(map(result => result))
  }

  public AddEmployeeAuditTrail(trail:AuditTrail){
    return this.httpClient.post<Response>(`${this.apiUrl}AuditTrail/AddEmployeeAuditTrail`, trail, this.httpOptions)
  }
}