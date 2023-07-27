import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { StockTypes } from '../Models/stocktypes';

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
    public GetStockTypes(): Observable<any>{ 
      return this.httpClient.get<StockTypes>(`${this.apiUrl}StockType/GetAllStockTypes`)
      .pipe(map(result => result))
    }
  
    //add
    public AddStockType(stocktype:StockTypes){
      return this.httpClient.post(`${this.apiUrl}StockType/AddStockType`, stocktype, this.httpOptions)
    }
  
    //get selected one
    public GetStockType(stock_Type_ID:Number){ 
      return this.httpClient.get(`${this.apiUrl}StockType/GetStockType`+ "/" + stock_Type_ID)
      .pipe(map(result => result))
    }
  
    //edit
    public UpdateStockType(stock_Type_ID:Number, stocktype:StockTypes){
      return this.httpClient.put(`${this.apiUrl}StockType/UpdateStockType/${stock_Type_ID}`, stocktype, this.httpOptions)
      .pipe(map(result => result))
    }
  
    //delete 
    public DeleteStockType(stock_Type_ID:Number){
      return this.httpClient.delete<string>(`${this.apiUrl}StockType/DeleteStockType` + "/" + stock_Type_ID, this.httpOptions)
      .pipe(map(result => result))
    }
  
  }