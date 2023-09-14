import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { StockTypes } from '../Models/stocktypes';
import { ProductRating } from '../Models/productrating';
import { Response } from '../Models/response';
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
 
    public getPreviousOrders(customer_ID:string){
      return this.httpClient.get(`${this.apiUrl}ProductRating/GetPreviousOrders/${customer_ID}`)
      .pipe(map(result => result))
      
    }

    public AddProductRating(productRating:ProductRating){
      return this.httpClient.post<Response>(`${this.apiUrl}ProductRating/AddProductRating`, productRating)
      .pipe(map(result => result))
    }
  
    public GetProductRating(product_Rating_ID:string){ 
      return this.httpClient.get(`${this.apiUrl}ProductRating/GetProductRating/${product_Rating_ID}`)
      .pipe(map(result => result))
    }

    public GetProductRatingByCustomerID(customerID:string){ 
      console.log(customerID)
      return this.httpClient.get(`${this.apiUrl}ProductRating/GetProductRatingByCustomerID/${customerID}`)
      .pipe(map(result => result))
    }
  
    public UpdateProductRating(productRatingId:string, productRating:ProductRating){
      return this.httpClient.put<Response>(`${this.apiUrl}ProductRating/UpdateProductRating/${productRatingId}`, productRating)
      .pipe(map(result => result))
    }

    public DeleteProductRating(productRatingId:string){
      return this.httpClient.delete<Response>(`${this.apiUrl}ProductRating/DeleteProductRating/${productRatingId}`)
      .pipe(map(result => result))
    }
  
  }