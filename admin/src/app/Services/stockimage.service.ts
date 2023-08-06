import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Stock_Image } from '../Models/stockimage';
import { Stock_Item } from '../Models/stockitem';
import { Response } from '../Models/response';

@Injectable({
    providedIn: 'root' 
  })
  export class StockImageDataService {
  
    apiUrl = 'https://localhost:44390/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
  
    constructor(private httpClient: HttpClient) { 
    }
  
    public GetAllStockImages(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}StockImage/GetAllStockImages`)
      .pipe(map(result => result))
    }
  
    public AddStockImage(stockimage:FormData){
      return this.httpClient.post<Response>(`${this.apiUrl}StockImage/AddStockImage`, stockimage, this.httpOptions)
    }

    public GetStockImage(stock_Image_ID:number){ 
      return this.httpClient.get(`${this.apiUrl}StockImage/GetStockImage/${stock_Image_ID}`)
      .pipe(map(result => result))
    }

    public UpdateStockImage(stock_Image_ID:number, stockimage:Stock_Image){
      return this.httpClient.put<Response>(`${this.apiUrl}StockImage/UpdateStockImage/${stock_Image_ID}`, stockimage)
    }

    public DeleteStockImage(stock_Image_ID:number){
      return this.httpClient.delete<Response>(`${this.apiUrl}StockImage/DeleteImage/${stock_Image_ID}`)
    }  
  }