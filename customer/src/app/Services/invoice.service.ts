import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Invoice } from 'src/app/Models/invoice'
import { Response } from '../Models/response';

@Injectable({
    providedIn: 'root' 
  })
  export class InvoiceService {
  
    apiUrl = 'https://localhost:44390/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
  
    constructor(private httpClient: HttpClient) { 
    }

    public AddInvoice(invoice:Invoice){
        return this.httpClient.post<Response>(`${this.apiUrl}Invoice/AddInvoice`, invoice, this.httpOptions)
    }


}
