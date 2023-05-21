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
      return this.httpClient.get(`${this.apiUrl}StockType/GetAllStockTypes`)
      .pipe(map(result => result))
    }
  
    //add
    public AddStockType(stocktype:StockTypes){
      return this.httpClient.post(`${this.apiUrl}StockType/AddStockType`, stocktype)
      .pipe(map(result => result))
    }
  
    //get selected one
    public GetStockType(StockTypeId:Number){ 
      return this.httpClient.get(`${this.apiUrl}StockType/GetStockType/${StockTypeId}`)
      .pipe(map(result => result))
    }
  
    //edit
    public UpdateStockType(StockTypeId:Number, stocktype:StockTypes){
      return this.httpClient.put(`${this.apiUrl}StockType/UpdateStockType/${StockTypeId}`, stocktype);
      //.pipe(map(result => result))
    }
  
    //delete 
    public DeleteStockType(StockTypeId:Number){
      return this.httpClient.delete(`${this.apiUrl}StockType/DeleteStockType/${StockTypeId}`);
      //.pipe(map(result => result))
    }
  
  }