import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Experience_Rating } from '../Models/experiencerating';
import { Response } from '../Models/response';
@Injectable({
    providedIn: 'root' 
  })
  export class Experience_RatingService {
  
    apiUrl = 'https://localhost:44390/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
  
    constructor(private httpClient: HttpClient) { 
    }

    //get all
    public GetAllExperienceRatings(): Observable<any>{ 
        return this.httpClient.get(`${this.apiUrl}ExperienceRating/GetAllExperienceRatings`)
        .pipe(map(result => result))
    }

    //get selected one
    public GetExperienceRating(Experience_Rating_ID:number){ 
        return this.httpClient.get(`${this.apiUrl}ExperienceRating/GetExperienceRating/${Experience_Rating_ID}`)
        .pipe(map(result => result))
    }

    //add
    public AddExperienceRating(Experience_Rating:Experience_Rating){
        return this.httpClient.post<Response>(`${this.apiUrl}ExperienceRating/AddExperienceRating`, Experience_Rating)
        .pipe(map(result => result))
    } 

    //edit
    public UpdateExperienceRating(Experience_Rating_ID:number, Experience_Rating:Experience_Rating){
        return this.httpClient.put<Response>(`${this.apiUrl}ExperienceRating/UpdateExperienceRating/${Experience_Rating_ID}`, Experience_Rating)
    }

    //delete 
    public DeleteExperienceRating(Experience_Rating_ID:number){
        return this.httpClient.delete<Response>(`${this.apiUrl}ExperienceRating/DeleteExeperienceRating/${Experience_Rating_ID}`)
    }
  
  }