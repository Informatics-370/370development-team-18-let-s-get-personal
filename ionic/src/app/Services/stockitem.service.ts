import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { StockTypes } from '../Models/stocktypes';
import { StockItem } from '../Models/stockitem';

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
    GetStockItems(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}StockItem/GetAllStockItemsAsync`)
      .pipe(map(result => result))
    }
  
    //add
    AddStockItem(stockitem:StockItem){
      return this.httpClient.post(`${this.apiUrl}StockItem/AddStockItemAsync`, stockitem)
      .pipe(map(result => result))
    }
  
    //get selected one
    GetStockItem(StockItemId:Number){ 
      return this.httpClient.get(`${this.apiUrl}StockType/GetStockItemDetailsAsync/${StockItemId}`)
      .pipe(map(result => result))
    }
  
    //edit
    UpdateStockItem(StockItemId:Number, stockitem:StockItem){
      return this.httpClient.put(`${this.apiUrl}StockItem/UpdateStockItemAsync/${StockItemId}`, stockitem)
      .pipe(map(result => result))
    }
  
    //delete 
    DeleteStockItem(StockItemId:Number){
      return this.httpClient.delete(`${this.apiUrl}StockItem/DeleteStockItemAsync/${StockItemId}`)
      .pipe(map(result => result))
    }
  
  }