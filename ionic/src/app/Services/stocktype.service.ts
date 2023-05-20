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
    GetStockTypes(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}StockType/GetAllStockTypesAsync`)
      .pipe(map(result => result))
    }
  
    //add
    AddStockType(stocktype:StockTypes){
      return this.httpClient.post(`${this.apiUrl}StockType/AddStockTypeAsync`, stocktype)
      .pipe(map(result => result))
    }
  
    //get selected one
    GetStockType(StockTypeId:Number){ 
      return this.httpClient.get(`${this.apiUrl}StockType/GetStockTypeDetailsAsync/${StockTypeId}`)
      .pipe(map(result => result))
    }
  
    //edit
    UpdateStockType(StockTypeId:Number, stocktype:StockTypes){
      return this.httpClient.put(`${this.apiUrl}StockType/UpdateStockTypeAsync/${StockTypeId}`, stocktype);
      //.pipe(map(result => result))
    }
  
    //delete 
    DeleteStockType(StockTypeId:Number){
      return this.httpClient.delete(`${this.apiUrl}StockType/DeleteStockTypeAsync/${StockTypeId}`);
      //.pipe(map(result => result))
    }
  
  }