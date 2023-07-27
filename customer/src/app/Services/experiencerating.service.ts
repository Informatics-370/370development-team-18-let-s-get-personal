import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Experience_Rating } from '../Models/experiencerating';
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
        return this.httpClient.get(`${this.apiUrl}Experience_Ratings/GetAllExperienceRatings`)
        .pipe(map(result => result))
    }

 //get selected one
    public GetExperienceRating(Experience_Rating_ID:Number){ 
        return this.httpClient.get(`${this.apiUrl}Experience_Ratings/GetExperienceRating/${Experience_Rating_ID}`)
        .pipe(map(result => result))
      }

  //add
    public AddExperienceRating(Experience_Rating:Experience_Rating){
        return this.httpClient.post(`${this.apiUrl}Experience_Ratings/AddExperienceRating`, Experience_Rating)
        .pipe(map(result => result))
    } 

 //edit
    public UpdateExperienceRating(Experience_Rating_ID:Number, Experience_Rating:Experience_Rating){
        return this.httpClient.put(`${this.apiUrl}Experience_Ratings/UpdateExperienceRating/${Experience_Rating_ID}`, Experience_Rating)
    }

  //delete 
    public DeleteExperienceRating(Experience_Rating_ID:Number){
        return this.httpClient.delete(`${this.apiUrl}Experience_Ratings/DeleteExeperienceRating/${Experience_Rating_ID}`)
        
    }
   
  
  }