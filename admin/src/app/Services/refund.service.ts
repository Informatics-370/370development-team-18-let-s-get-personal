import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Refund } from '../Models/refund';
import { Refund_Policy } from '../Models/refundpolicy';
import { RefundVM } from '../ViewModels/refundVM';
import { Response } from '../Models/response';
@Injectable({
    providedIn: 'root' 
  })
  export class RefundService {
  
    apiUrl = 'https://localhost:44390/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
  
    constructor(private httpClient: HttpClient) { 
    }
  
    //API
     GetAllPreviousRefunds(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}Refund/GetAllPreviousRefunds`)
      .pipe(map(result => result))
  }
    //get all previous refund policies
    GetAllRefundPolicies(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}Refund/GetAllRefundPolicies`)
      .pipe(map(result => result))
    }
  
    //add
    AddRefundPolicy(policy:Refund_Policy){
      return this.httpClient.post<Response>(`${this.apiUrl}Refund/AddRefundPolicy`, policy)
      .pipe(map(result => result))
    }

    //delete 
    DeleteRefundPolicy(refund_Policy_ID:Number){
      return this.httpClient.delete<Response>(`${this.apiUrl}Refund/DeleteRefundPolicy/${refund_Policy_ID}`);
    }

    //get customer
    GetCustomer(customer_ID:Number){ 
        return this.httpClient.get(`${this.apiUrl}Refund/GetCustomer/${customer_ID}`)
        .pipe(map(result => result))
    }
    
    //process refund 
    AddRefund(refund: RefundVM){
        return this.httpClient.post<Response>(`${this.apiUrl}Refund/AddRefund`, refund)
        .pipe(map(result => result))
    }

    DeleteSale(Sale_Id:Number){
      return this.httpClient.delete<Response>(`${this.apiUrl}Refund/DeleteSaleAsync/${Sale_Id}`);
    }
   
  
  }