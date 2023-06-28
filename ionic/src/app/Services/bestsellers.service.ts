import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Best_Sellers } from '../Models/bestsellers';

@Injectable({
    providedIn: 'root' 
  })
  export class BestSellerDataService {
  
    apiUrl = 'https://localhost:44390/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
  
    constructor(private httpClient: HttpClient) {  }
  
    public GetBestSellers(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}BestSellers/GetAllBestSellers`)
      .pipe(map(result => result))
    }
  
    //add
    public AddBestSeller(bestseller:Best_Sellers){
      return this.httpClient.post(`${this.apiUrl}BestSellers/AddBestSeller`, bestseller)
      .pipe(map(result => result))
    }
  
  }