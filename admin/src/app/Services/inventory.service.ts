import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Write_Off } from '../Models/writeoff';
import { Stock_Item } from '../Models/stockitem';
import { Response } from '../Models/response';
import { Write_Off_Line_Item } from '../Models/writeofflineitem';
@Injectable({
    providedIn: 'root' 
  })
  export class InventoryDataService {
  
    apiUrl = 'https://localhost:44390/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
  
    constructor(private httpClient: HttpClient) { 
    }
  
    public Stocktake(stock_Item_ID:string, stockitem:Stock_Item){
      return this.httpClient.put<Response>(`${this.apiUrl}Inventory/Stocktake/${stock_Item_ID}`, stockitem)
    }

    public AddToWriteoff(stockitem:Write_Off){
      return this.httpClient.post(`${this.apiUrl}Inventory/AddToWriteoff`, stockitem, this.httpOptions)
    }    

    public AddToWriteoffLine(stockitem:Write_Off_Line_Item){
      return this.httpClient.post<Response>(`${this.apiUrl}Inventory/AddToWriteoffLine`, stockitem, this.httpOptions)
    } 

    public GetWriteOffs(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}Inventory/GetWriteOffs`)
      .pipe(map(result => result))
    }
    
}