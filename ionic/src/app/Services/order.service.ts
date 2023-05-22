import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Order } from '../Models/orders';

@Injectable({
    providedIn: 'root' 
  })
  export class OrderDataService {
  
    apiUrl = 'https://localhost:44390/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
  
    constructor(private httpClient: HttpClient) { 
    }
  
    //return http.loacalhost:5116/api/Course/GetAllStockTypes
    public GetOrders(): Observable<any>{ 
      return this.httpClient.get(`${this.apiUrl}Order/GetAllOrders`)
      .pipe(map(result => result))
    }
  
    

/*
GetDeliveryCompany(deliveryCompanyId:Number) {
    return this.httpClient.get(`${this.apiUrl}DeliveryCompany/GetCourse` + "/" + courseId)
    .pipe(map(result => result))
  }

  getCourses(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Course/GetAllCourses`)
    .pipe(map(result => result))
  }

  addCourse(course: Course)
  {
    return this.httpClient.post(`${this.apiUrl}Course/AddCourse`, course, this.httpOptions)
  }

  deleteCourse(courseId: Number)
  {
    return this.httpClient.delete<string>(`${this.apiUrl}Course/DeleteCourse` + "/" + courseId, this.httpOptions)
  }

  editCourse(courseId: number, course: Course)
  {
    return this.httpClient.put(`${this.apiUrl}Course/EditCourse/${courseId}`,course, this.httpOptions)
  }
*/
  
  }