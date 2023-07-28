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

  public GetStockItems(): Observable<any>{ 
    return this.httpClient.get(`${this.apiUrl}StockItem/GetAllStockItems`)
    .pipe(map(result => result))
  }

  public SaveBestSellersList(selectedProducts: Stock_Item[]): Observable<any> {
    return this.httpClient.post<Response>(`${this.apiUrl}BestSellers/SaveBestSellersList`, selectedProducts, this.httpOptions)
    .pipe(map(result => result))
  }

  public GetBestSellers(): Observable<any>{ 
    return this.httpClient.get(`${this.apiUrl}StockItem/GetLastestBestSellers`)
    .pipe(map(result => result))
  }
}
