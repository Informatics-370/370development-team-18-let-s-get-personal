import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Response } from '../Models/response';
import { Design_Image } from '../Models/designimage';
import { Design_Image_Line_Item } from '../Models/designimagelineitem';
import { Design_Text } from '../Models/designtext';
import { PersonalisationDesignVM } from '../ViewModels/personalisationdesignVM';
import { TextPrice } from '../Models/textprice';
import { Image_Price } from '../Models/imageprice'; 
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
   
  public UploadDesignImage(designimage:Design_Image){
    return this.httpClient.post<Response>(`${this.apiUrl}Personalisation/UploadDesignImage`, designimage)
    .pipe(map(result => result))
  }

  public AddToDesignImage(designimagelineitem:Design_Image_Line_Item){
    return this.httpClient.post<Response>(`${this.apiUrl}Personalisation/AddToDesignImage`, designimagelineitem)
    .pipe(map(result => result))
  }

  public UploadDesignText(designtext:Design_Text){
    return this.httpClient.post<Response>(`${this.apiUrl}Personalisation/UploadDesignText`, designtext)
    .pipe(map(result => result))
  }

  public AddPersonalisation(personalisation:PersonalisationDesignVM): Observable<any>{
    return this.httpClient.post<Response>(`${this.apiUrl}Personalisation/AddPersonalisation`, personalisation, this.httpOptions)
    .pipe(map(result => result))
  }
 

  public DeletePersonalisation(personalisationId:number): Observable<any>{
    return this.httpClient.delete<Response>(`${this.apiUrl}Personalisation/DeletePersonalisation/${personalisationId}`)
    .pipe(map(result => result))
  }

  public GetAllTextPrices(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Personalisation/GetAllTextPrices`)
    .pipe(map(result => result))
  }

  public GetTextPrice(text_Price_ID:string){ 
    return this.httpClient.get(`${this.apiUrl}Personalisation/GetTextPrice`+ "/" + text_Price_ID)
    .pipe(map(result => result))
  }

  public UpdateTextPrice(text_Price_ID:string, textprice:TextPrice){
    return this.httpClient.put<Response>(`${this.apiUrl}Personalisation/UpdateTextPrice/${text_Price_ID}`, textprice)
  }

  public GetAllImagePrices(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Personalisation/GetAllImagePrices`)
    .pipe(map(result => result))
  }

  public GetImagePrice(image_Price_ID:string){ 
    return this.httpClient.get(`${this.apiUrl}Personalisation/GetImagePrice`+ "/" + image_Price_ID)
    .pipe(map(result => result))
  }

  public UpdateImagePrice(image_Price_ID:string, imageprice:Image_Price){
    return this.httpClient.put<Response>(`${this.apiUrl}Personalisation/UpdateImagePrice/${image_Price_ID}`, imageprice)
  }
}
 // public GetStockItemColours(): Observable<any>{
  //   return this.httpClient.get(`${this.apiUrl}StockItemColour/GetAllStockItemColours`)
  //   .pipe(map(result => result))
  // }

  // public AddPersonalisation(personalisation:any): Observable<any>{
  //   return this.httpClient.post<Response>(`${this.apiUrl}Personalisation/AddPersonalisation`, personalisation, this.httpOptions)
  //   .pipe(map(result => result))
  // }

  // public UpdatePersonalisation(personalisationId:number, personalisation:any): Observable<any>{
  //   return this.httpClient.put<Response>(`${this.apiUrl}Personalisation/UpdatePersonalisation/${personalisationId}`, personalisation)
  //   .pipe(map(result => result))
  // }