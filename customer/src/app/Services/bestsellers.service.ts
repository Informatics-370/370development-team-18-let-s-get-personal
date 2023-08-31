import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Stock_Item } from '../Models/stockitem';
import { Response } from '../Models/response';

@Injectable({
  providedIn: 'root'
})
export class BestsellersService {

  apiUrl = 'https://localhost:44390/api/'
  
  httpOptions ={
    headers: new HttpHeaders({
    ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  public GetBestSellers(): Observable<any>{ 
    return this.httpClient.get(`${this.apiUrl}StockItem/GetLastestBestSellers`)
    .pipe(map(result => result))
  }
}
