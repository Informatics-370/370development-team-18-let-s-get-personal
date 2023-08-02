import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Discount } from '../Models/discount';

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
        return this.httpClient.post(`${this.apiUrl}Discount/AddDiscount`, discount)
        .pipe(map(result => result))
    }

 //get selected one
    public GetDiscount(discount_ID:string){ 
        return this.httpClient.get(`${this.apiUrl}Discount/GetDiscount/${discount_ID}`)
        .pipe(map(result => result))
      }

 //edit
    public UpdateDiscount(Discount_ID:string, discount:Discount){
        return this.httpClient.put(`${this.apiUrl}Discount/UpdateDiscount/${Discount_ID}`, discount)
    }

  //delete 
    public DeleteDiscount(Discount_ID:string){
        return this.httpClient.delete(`${this.apiUrl}Discount/DeleteDiscount/${Discount_ID}`)
        
    }
   
  
  }