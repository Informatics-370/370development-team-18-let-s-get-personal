import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { StockTypes } from '../Models/stocktypes';
import { StockItemColours } from '../Models/stockitemcolour';

@Injectable({
    providedIn: 'root' 
  })
  export class StockTypeDataService {
  
    apiUrl = 'https://localhost:44390/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
  
    constructor(private httpClient: HttpClient) { 
    }
  
    //return http.loacalhost:5116/api/Course/GetAllStockTypes
    GetStockItemColours(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}StockItemColour/GetAllStockItemColours`)
      .pipe(map(result => result))
    }
  
    //add
    AddStockItemColour(stockitemcolour:StockItemColours){
      return this.httpClient.post(`${this.apiUrl}StockItemColour/AddStockItemColour`, stockitemcolour)
      .pipe(map(result => result))
    }
  
    //get selected one
    GetStockItemColour(StockItemColourId:Number){ 
      return this.httpClient.get(`${this.apiUrl}StockItemColour/GetStockItemColour/${StockItemColourId}`)
      .pipe(map(result => result))
    }
  
    //edit
    UpdateStockItemColour(StockItemColourId:Number, stockitemcolour:StockItemColours){
      return this.httpClient.put(`${this.apiUrl}StockType/UpdateStockItemColour/${StockItemColourId}`, stockitemcolour)
      .pipe(map(result => result))
    }
  
    //delete 
    DeleteStockItemColour(StockItemColourId:Number){
      return this.httpClient.delete(`${this.apiUrl}StockItemColour/DeleteStockItemColour/${StockItemColourId}`)
      .pipe(map(result => result))
    }
  
  }