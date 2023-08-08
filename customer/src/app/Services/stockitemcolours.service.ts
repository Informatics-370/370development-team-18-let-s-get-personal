import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
//import { StockTypes } from '../Models/stocktypes';
import { StockItemColours } from '../Models/stockitemcolour';
import { Response } from '../Models/response';

@Injectable({
    providedIn: 'root' 
  })
  export class StockItemColourDataService {
  
    apiUrl = 'https://localhost:44390/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
  
    constructor(private httpClient: HttpClient) { 
    }
  
    public GetStockItemColours(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}StockItemColour/GetAllStockItemColours`)
      .pipe(map(result => result))
    }  
    
    public AddStockItemColour(stockitemcolour:StockItemColours){
      return this.httpClient.post<Response>(`${this.apiUrl}StockItemColour/AddStockItemColour`, stockitemcolour, this.httpOptions)
    }     
  
    public GetStockItemColour(stock_Item_Colour_ID:number){ 
      return this.httpClient.get(`${this.apiUrl}StockItemColour/GetStockItemColour`+ "/" + stock_Item_Colour_ID)
      .pipe(map(result => result))
    }
  
    public UpdateStockItemColour(stock_Item_Colour_ID:number, stockitemcolour:StockItemColours){
      return this.httpClient.put<Response>(`${this.apiUrl}StockType/UpdateStockItemColour/${stock_Item_Colour_ID}`, stockitemcolour, this.httpOptions)
    }
  
    public DeleteStockItemColour(stock_Item_Colour_ID:number){
      return this.httpClient.delete<Response>(`${this.apiUrl}StockItemColour/DeleteStockItemColour`+ "/"+ stock_Item_Colour_ID, this.httpOptions)
    }
  
  }

