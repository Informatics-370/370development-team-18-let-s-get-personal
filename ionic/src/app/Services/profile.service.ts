import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { StockTypes } from '../Models/stocktypes';

@Injectable({
    providedIn: 'root' 
  })
  export class ProfileService {
  
    apiUrl = 'https://localhost:44390/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
  
    constructor(private httpClient: HttpClient) { 
    }

  
    //add
    AddStockType(profile:StockTypes){
      return this.httpClient.post(`${this.apiUrl}StockType/AddCourse`, profile)
      .pipe(map(result => result))
    }
  
    //get selected one
    GetStockType(StockTypeId:Number){ 
      return this.httpClient.get(`${this.apiUrl}StockType/GetCourse/${StockTypeId}`)
      .pipe(map(result => result))
    }
  
    //edit
    EditStockType(StockTypeId:Number, stocktype:StockTypes){
      return this.httpClient.put(`${this.apiUrl}StockType/EditStockType/${StockTypeId}`, stocktype);
    }
  
    //delete 
    DeleteStockType(StockTypeId:Number){
      return this.httpClient.delete(`${this.apiUrl}StockType/DeleteStockType/${StockTypeId}`);
    }
  
  }