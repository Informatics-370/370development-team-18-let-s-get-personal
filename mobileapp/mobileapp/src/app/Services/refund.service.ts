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
  

    GetAllPreviousRefunds(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}Refund/GetAllPreviousRefunds`)
      .pipe(map(result => result))
    }

    //*************** Process Refund ***************\\
    public FindOrderRefund(order_Id:number){ 
      return this.httpClient.get(`${this.apiUrl}Refund/FindOrderRefund/${order_Id}`)
      .pipe(map(result => result))
    }

    DeleteOrderRefund(order_Id:number){
      return this.httpClient.delete<Response>(`${this.apiUrl}Refund/DeleteOrderRefund/${order_Id}`);
    }

    AddRefund(refund:RefundVM){
      return this.httpClient.post<Response>(`${this.apiUrl}Refund/AddRefund`, refund)
      .pipe(map(result => result))
    }

    //*************** Refund Policies ***************\\
    GetAllRefundPolicies(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}Refund/GetAllRefundPolicies`)
      .pipe(map(result => result))
    }  
  }