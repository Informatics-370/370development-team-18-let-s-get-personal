import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
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

  public GetAllMessageRequests(): Observable<any>{ 
    return this.httpClient.get(`${this.apiUrl}ContactUs/GetAllMessageRequests`)
    .pipe(map(result => result))
  } 

  public GetMessageRequest(contact_Us_ID:string){ 
    return this.httpClient.get(`${this.apiUrl}ContactUs/GetMessageRequest`+ "/" + contact_Us_ID)
    .pipe(map(result => result))
  }

  public UpdateContactUsStatus(contact_Us_ID:string, contact:ContactUs){
    return this.httpClient.put<Response>(`${this.apiUrl}ContactUs/UpdateContactUsStatus/${contact_Us_ID}`, contact, this.httpOptions)
  }

  public DeleteContactUs(contact_Us_ID:string){
    return this.httpClient.delete<Response>(`${this.apiUrl}ContactUs/DeleteContactUs` + "/" + contact_Us_ID, this.httpOptions)
  }
  
}