import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuditTrail } from '../Models/audittrail';
import { Response } from '../Models/response';
import {ContactUs} from '../Models/contactus';
@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  apiUrl = 'https://localhost:44390/api/'
  
  httpOptions ={
    headers: new HttpHeaders({
    ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  public AddMessageRequest(contact:ContactUs){
    return this.httpClient.post<Response>(`${this.apiUrl}ContactUs/AddMessageRequest`, contact, this.httpOptions)
  }
  
}