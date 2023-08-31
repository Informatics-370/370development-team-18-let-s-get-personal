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

  //get selected one
    public GetDiscount(discount_ID:number){ 
        return this.httpClient.get(`${this.apiUrl}Discount/GetDiscount/${discount_ID}`)
        .pipe(map(result => result))
      }
  
  
  }