import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { StockTypes } from '../Models/stocktypes';
import { ProductRating } from '../Models/productrating';

@Injectable({
    providedIn: 'root' 
  })
  export class ProductRatingDataService {
  
    apiUrl = 'https://localhost:44390/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
  
    constructor(private httpClient: HttpClient) { 
    }
  
    //return http.loacalhost:5116/api/Course/GetAllStockTypes
    public GetProductRatings(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}ProductRating/GetAllProductRatings`)
      .pipe(map(result => result))
    }
  
    //add
    public AddProductRating(productRating:ProductRating){
      return this.httpClient.post(`${this.apiUrl}ProductRating/AddProductRating`, productRating)
      .pipe(map(result => result))
    }
  
    //get selected one
    public GetProductRating(productRatingId:string){ 
      return this.httpClient.get(`${this.apiUrl}ProductRating/GetProductRating/${productRatingId}`)
      .pipe(map(result => result))
    }
  
    //edit
    public UpdateProductRating(productRatingId:string, productRating:ProductRating){
      return this.httpClient.put(`${this.apiUrl}ProductRating/UpdateProductRating/${productRatingId}`, productRating)
      .pipe(map(result => result))
    }
  
    //delete 
    public DeleteProductRating(productRatingId:string){
      return this.httpClient.delete(`${this.apiUrl}ProductRating/DeleteProductRating/${productRatingId}`)
      .pipe(map(result => result))
    }
  
  }