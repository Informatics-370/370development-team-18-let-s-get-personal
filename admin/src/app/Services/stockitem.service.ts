import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { StockTypes } from '../Models/stocktypes';
import { Stock_Item } from '../Models/stockitem';
import { Response } from '../Models/response';

@Injectable({
    providedIn: 'root' 
  })
  export class StockItemDataService {
  
    apiUrl = 'https://localhost:44390/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
  
    constructor(private httpClient: HttpClient) { 
    }
  
    //return http.loacalhost:5116/api/Course/GetAllStockTypes
    public GetStockItems(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}StockItem/GetAllStockItems`)
      .pipe(map(result => result))
    }
  
    //add
    public AddStockItem(stockitem:Stock_Item){
      return this.httpClient.post<Response>(`${this.apiUrl}StockItem/AddStockItem`, stockitem, this.httpOptions)
    }
  
    //get selected one
    public GetStockItem(StockItemId:Number){ 
      return this.httpClient.get(`${this.apiUrl}StockItem/GetStockItem/${StockItemId}`)
      .pipe(map(result => result))
    }
  
    //edit
    public UpdateStockItem(StockItemId:Number, stockitem:Stock_Item){
      return this.httpClient.put<Response>(`${this.apiUrl}StockItem/UpdateStockItem/${StockItemId}`, stockitem)
    }
  
    //delete 
    public DeleteStockItem(StockItemId:Number){
      return this.httpClient.delete<Response>(`${this.apiUrl}StockItem/DeleteStockItem/${StockItemId}`)
    }
  
  }