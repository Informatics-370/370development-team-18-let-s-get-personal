import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { StockTypes } from '../Models/stocktypes';

@Injectable({
    providedIn: 'root' 
  })
  export class ProfileService {
    DeleteStockType(profileId: Number) {
      throw new Error('Method not implemented.');
    }
  
    apiUrl = 'https://localhost:44390/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
  
    constructor(private httpClient: HttpClient) { 
    }

  
    
  
  }