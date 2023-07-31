import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  
  apiUrl = 'https://localhost:44390/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
  
    constructor(private httpClient: HttpClient) { }

    public GetAllTitles(): Observable<any> {
      return this.httpClient.get<any>(`${this.apiUrl}UserProfile/GetAllTitles`)
      .pipe(map(res => {
        return res;
      }))
    }

    public GetTitleByName(titleName: string): Observable<any> {
      return this.httpClient.get<any>(`${this.apiUrl}UserProfile/GetTitleByName/${titleName}`)
      .pipe(map(res => {
        return res;
      }))
    }

    public GetAllGenders(): Observable<any> {
      return this.httpClient.get<any>(`${this.apiUrl}UserProfile/GetAllGenders`)
      .pipe(map(res => {
        return res;
      }))
    }

    public GetGenderByName(genderName: string): Observable<any> {
      return this.httpClient.get<any>(`${this.apiUrl}UserProfile/GetGenderByName/${genderName}`)
      .pipe(map(res => {
        return res;
      }))
    }

    public GetAllProvinces(): Observable<any> {
      return this.httpClient.get<any>(`${this.apiUrl}UserProfile/GetAllProvinces`)
      .pipe(map(res => {
        return res;
      }))
    }

    public GetProvinceByName(provinceName: string): Observable<any> {
      return this.httpClient.get<any>(`${this.apiUrl}UserProfile/GetProvinceByName/${provinceName}`)
      .pipe(map(res => {
        return res;
      }))
    }

    public GetAllCities(): Observable<any> {
      return this.httpClient.get<any>(`${this.apiUrl}UserProfile/GetAllCities`)
      .pipe(map(res => {
        return res;
      }))
    }

    public GetCityByName(cityName: string): Observable<any> {
      return this.httpClient.get<any>(`${this.apiUrl}UserProfile/GetCityByName/${cityName}`)
      .pipe(map(res => {
        return res;
      }))
    }
}
