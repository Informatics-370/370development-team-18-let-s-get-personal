import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Response } from '../Models/response';
import { Design_Image } from '../Models/designimage';
import { Design_Image_Line_Item } from '../Models/designimagelineitem';
import { Design_Text } from '../Models/designtext';
import { PersonalisationDesignVM } from '../ViewModels/personalisationdesignVM';
import { TextPrice } from '../Models/textprice';
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

  // public AddToDesignImageLineItem(designimagelineitem:Design_Image_Line_Item){
  //   return this.httpClient.post(`${this.apiUrl}Personalisation/AddToDesignImageLineItem`, designimagelineitem)
  //   .pipe(map(result => result))
  // }

   public DeletePersonalisation(personalisationId:string): Observable<any>{
     return this.httpClient.delete<Response>(`${this.apiUrl}Personalisation/DeletePersonalisation/${personalisationId}`)
     .pipe(map(result => result))
   }

  // public GetAllTextPrices(): Observable<any>{
  //   return this.httpClient.get(`${this.apiUrl}Personalisation/GetAllTextPrices`)
  //   .pipe(map(result => result))
  // }
 
  // public AddTextPrice(textprice:TextPrice){
  //   return this.httpClient.post<Response>(`${this.apiUrl}Personalisation/AddTextPrice`, textprice)
  //   .pipe(map(result => result))
  // }

  // public UpdateTextPrice(text_Price_ID:string, textprice:TextPrice){
  //   return this.httpClient.put<Response>(`${this.apiUrl}Personalisation/UpdateTextPrice/${text_Price_ID}`, textprice)
  // }

  // public GetAllImagePrices(): Observable<any>{
  //   return this.httpClient.get(`${this.apiUrl}Personalisation/GetAllImagePrices`)
  //   .pipe(map(result => result))
  // }

  // public AddImagePrice(imageprice:Image_Price){
  //   return this.httpClient.post<Response>(`${this.apiUrl}Personalisation/AddImagePrice`, imageprice)
  //   .pipe(map(result => result))
  // }

  // public UpdateImagePrice(image_Price_ID:string, imageprice:Image_Price){
  //   return this.httpClient.put<Response>(`${this.apiUrl}Personalisation/UpdateImagePrice/${image_Price_ID}`, imageprice)
  // }
  
  public UpdatePersonalisation(personalisationId:number, personalisation:any): Observable<any>{
     return this.httpClient.put<Response>(`${this.apiUrl}Personalisation/UpdatePersonalisation/${personalisationId}`, personalisation)
     .pipe(map(result => result))
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

  
