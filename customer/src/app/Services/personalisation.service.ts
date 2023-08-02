import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

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

  public GetPersonalisation(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Personalisation/GetPersonalisation`)
    .pipe(map(result => result))
  }

  public GetStockItemColours(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}StockItemColour/GetAllStockItemColours`)
    .pipe(map(result => result))
  }

  public AddPersonalisation(personalisation:any): Observable<any>{
    return this.httpClient.post(`${this.apiUrl}Personalisation/AddPersonalisation`, personalisation, this.httpOptions)
    .pipe(map(result => result))
  }

  public UpdatePersonalisation(personalisationId:string, personalisation:any): Observable<any>{
    return this.httpClient.put(`${this.apiUrl}Personalisation/UpdatePersonalisation/${personalisationId}`, personalisation)
    .pipe(map(result => result))
  }

  public DeletePersonalisation(personalisationId:string): Observable<any>{
    return this.httpClient.delete(`${this.apiUrl}Personalisation/DeletePersonalisation/${personalisationId}`)
    .pipe(map(result => result))
  }

  // private async savePicture(photo: Photo) { }

}
