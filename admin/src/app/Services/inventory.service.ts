import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { StockTypes } from '../Models/stocktypes';
import { Stock_Item } from '../Models/stockitem';
import { Response } from '../Models/response';
import { Inventory } from '../Models/inventory';
import { Inventory_Line_Item } from '../Models/inventorylineitem';

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
  
    public GetInventoryItems(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}Inventory/GetAllProducts`)
      .pipe(map(result => result))
    }

    public AddToInventory(inventory:Inventory){
      return this.httpClient.post<Response>(`${this.apiUrl}Inventory/AddToInventory`, inventory, this.httpOptions)
    }

    public AddToInventoryLineItem(lineitem:Inventory_Line_Item){
      return this.httpClient.post<Response>(`${this.apiUrl}Inventory/AddToInventoryLineItem`, lineitem, this.httpOptions)
    }

    public GetInventoryById(inventory_Id:number){ 
      return this.httpClient.get(`${this.apiUrl}Inventory/GetInventoryById/${inventory_Id}`)
      .pipe(map(result => result))
    }
  
    
}