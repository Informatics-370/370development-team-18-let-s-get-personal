import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Discount } from '../Models/discount';
import { Response } from '../Models/response';

@Injectable({
    providedIn: 'root' 
  })

  export class DiscountService {
  
    apiUrl = 'https://localhost:44390/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
  
    constructor(private httpClient: HttpClient) { 
    }
    
  //get all
    public GetAllDiscounts(): Observable<any>{ 
        return this.httpClient.get(`${this.apiUrl}Discount/GetAllDiscounts`)
        .pipe(map(result => result))
    }

  //add
    public AddDiscount(discount:Discount){
        return this.httpClient.post<Response>(`${this.apiUrl}Discount/AddDiscount`, discount)
        .pipe(map(result => result))
    }

<<<<<<< HEAD
  //get selected one
    public GetDiscount(discount_ID:number){ 
        return this.httpClient.get(`${this.apiUrl}Discount/GetDiscount/${discount_ID}`)
        .pipe(map(result => result))
      }

  //edit
    public UpdateDiscount(discount_ID:number, discount:Discount){
        return this.httpClient.put<Response>(`${this.apiUrl}Discount/edit-discounts/${discount_ID}`, discount)
=======
    public GetDiscountByStock(stock_Item_ID:string){ 
      return this.httpClient.get(`${this.apiUrl}Discount/GetDiscountByStockID/${stock_Item_ID}`)
      .pipe(map(result => result))
>>>>>>> developer
    }

    //delete 
    public DeleteDiscount(Discount_ID:number){
        return this.httpClient.delete<Response>(`${this.apiUrl}Discount/DeleteDiscount/${Discount_ID}`)  
    }
   
  
  }