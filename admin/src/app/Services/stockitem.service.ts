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
  
    
    public GetStockItems(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}StockItem/GetAllStockItems`)
      .pipe(map(result => result))
    }
    
    public AddStockItem(stockitem:Stock_Item){
      return this.httpClient.post<Response>(`${this.apiUrl}StockItem/AddStockItem`, stockitem, this.httpOptions)
    }

    public GetStockItem(stock_Item_ID:string){ 
      return this.httpClient.get(`${this.apiUrl}StockItem/GetStockItem/${stock_Item_ID}`)
      .pipe(map(result => result))
    }
    
    public UpdateStockItem(stock_Item_ID:string, stockitem:Stock_Item){
      return this.httpClient.put<Response>(`${this.apiUrl}StockItem/UpdateStockItem/${stock_Item_ID}`, stockitem)
    }
    
    public DeleteStockItem(stock_Item_ID:string){
      return this.httpClient.delete<Response>(`${this.apiUrl}StockItem/DeleteStockItem/${stock_Item_ID}`)
    }

    public GetStockItemPriceHistory(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}StockItem/GetStockItemsWithPriceHistory`)
      .pipe(map(result => result))
    }
  
  }