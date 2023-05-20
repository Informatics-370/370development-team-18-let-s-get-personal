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
    GetProductRatings(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}ProductRating/GetAllProductRatings`)
      .pipe(map(result => result))
    }
  
    //add
    AddProductRating(stocktype:StockTypes){
      return this.httpClient.post(`${this.apiUrl}ProductRating/AddProductRating`, stocktype)
      .pipe(map(result => result))
    }
  
    //get selected one
    GetProductRating(StockTypeId:Number){ 
      return this.httpClient.get(`${this.apiUrl}ProductRating/GetProductRating/${StockTypeId}`)
      .pipe(map(result => result))
    }
  
    //edit
    UpdateProductRating(StockTypeId:Number, stocktype:StockTypes){
      return this.httpClient.put(`${this.apiUrl}ProductRating/UpdateProductRating/${StockTypeId}`, stocktype);
      //.pipe(map(result => result))
    }
  
    //delete 
    DeleteProductRating(StockTypeId:Number){
      return this.httpClient.delete(`${this.apiUrl}ProductRating/DeleteProductRating/${StockTypeId}`);
      //.pipe(map(result => result))
    }
  
  }