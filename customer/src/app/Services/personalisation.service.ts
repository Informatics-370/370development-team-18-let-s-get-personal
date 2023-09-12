import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Response } from '../Models/response';
import { Design_Text } from '../Models/designtext';
import { PersonalisationDesignVM } from '../ViewModels/personalisationdesignVM';

@Injectable({
  providedIn: 'root'
})
export class PersonalisationService {
  apiUrl = 'https://localhost:44390/api/'
  
  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { 
  }
  // public GetPersonalisation(): Observable<any>{
  //     return this.httpClient.get(`${this.apiUrl}Personalisation/GetPersonalisation`)
  //     .pipe(map(result => result))
  // }

  public UploadDesignImage(designimage:FormData){
    return this.httpClient.post(`${this.apiUrl}Personalisation/UploadDesignImage`, designimage)
    .pipe(map(result => result))
  }

  public UploadDesignText(designtext:Design_Text){
    return this.httpClient.post(`${this.apiUrl}Personalisation/UploadDesignText`, designtext)
    .pipe(map(result => result))
  }

  public AddPersonalisation(personalisation:PersonalisationDesignVM): Observable<any>{
    return this.httpClient.post(`${this.apiUrl}Personalisation/AddPersonalisation`, personalisation, this.httpOptions)
    .pipe(map(result => result))
  }

  // public DeletePersonalisation(personalisationId:string): Observable<any>{
  //   return this.httpClient.delete<Response>(`${this.apiUrl}Personalisation/DeletePersonalisation/${personalisationId}`)
  //   .pipe(map(result => result))
  // }

  // public UpdatePersonalisation(personalisationId:number, personalisation:any): Observable<any>{
  //   return this.httpClient.put<Response>(`${this.apiUrl}Personalisation/UpdatePersonalisation/${personalisationId}`, personalisation)
  //   .pipe(map(result => result))
  // }
}

  
