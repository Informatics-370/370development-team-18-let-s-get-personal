import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuditTrail } from '../Models/audittrail';
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

  public AddCustomerAuditTrail(trail:AuditTrail){
    return this.httpClient.post<Response>(`${this.apiUrl}AuditTrail/AddCustomerAuditTrail`, trail, this.httpOptions)
  }
}