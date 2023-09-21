import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Stock_Item } from '../Models/stockitem';
import { Response } from '../Models/response';
import { BestSellerVM } from 'src/app/ViewModels/bestsellerVM';
import { Best_Sellers } from 'src/app/Models/bestsellers';
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

  public AddBestSeller(selectedProducts: Best_Sellers){
    return this.httpClient.post<Response>(`${this.apiUrl}BestSellers/AddBestSeller`, selectedProducts, this.httpOptions)
  }

  public GetBestSellers(): Observable<any>{ 
    return this.httpClient.get(`${this.apiUrl}BestSellers/GetLastestBestSellers`)
    .pipe(map(result => result))
  }

  public RemoveBestSeller(bestsellerId:string){
    return this.httpClient.delete<Response>(`${this.apiUrl}BestSellers/RemoveBestSeller/${bestsellerId}`)
  }
}
