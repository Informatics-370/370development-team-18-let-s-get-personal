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

    public GetStockImage(stock_Image_ID:number){ 
      return this.httpClient.get(`${this.apiUrl}StockImage/GetStockImage/${stock_Image_ID}`)
      .pipe(map(result => result))
    }
  }