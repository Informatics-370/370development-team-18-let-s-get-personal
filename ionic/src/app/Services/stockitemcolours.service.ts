import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
//import { StockTypes } from '../Models/stocktypes';
import { StockItemColours } from '../Models/stockitemcolour';

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
  
    //return http.loacalhost:5116/api/Course/GetAllStockTypes
    public GetStockItemColours(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}StockItemColour/GetAllStockItemColours`)
      .pipe(map(result => result))
    }  
    
    //add
    public AddStockItemColour(stockitemcolour:StockItemColours){
      return this.httpClient.post(`${this.apiUrl}StockItemColour/AddStockItemColour`, stockitemcolour, this.httpOptions)
      //.pipe(map(result => result))
    }
      
  
    //get selected one
    public GetStockItemColour(stock_Item_Colour_ID:Number){ 
      return this.httpClient.get(`${this.apiUrl}StockItemColour/GetStockItemColour`+ "/" + stock_Item_Colour_ID)
      .pipe(map(result => result))
    }
  
    //edit
    public UpdateStockItemColour(stock_Item_Colour_ID:Number, stockitemcolour:StockItemColours){
      return this.httpClient.put(`${this.apiUrl}StockType/UpdateStockItemColour/${stock_Item_Colour_ID}`, stockitemcolour, this.httpOptions)
      //.pipe(map(result => result))
    }
  
    //delete 
    public DeleteStockItemColour(stock_Item_Colour_ID:Number){
      return this.httpClient.delete<string>(`${this.apiUrl}StockItemColour/DeleteStockItemColour`+ "/"+ stock_Item_Colour_ID, this.httpOptions)
      .pipe(map(result => result))
    }
  
  }

