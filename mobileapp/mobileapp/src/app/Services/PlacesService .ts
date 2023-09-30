import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private apiKey = 'AIzaSyDmbh7Bh6P-aR-w9LJMdy6c3zTVhDd-K3A'; // Replace with your actual API key
  private autocompleteService: any;

  constructor(private http: HttpClient) {
    this.autocompleteService = new google.maps.places.AutocompleteService();
   }


   getPlacePredictions(query: string): Observable<any[]> {
    return new Observable((observer) => {
      if (query) {
        this.autocompleteService.getPlacePredictions(
          { input: query },
          (predictions: any[], status: string) => {
            if (status === 'OK') {
              observer.next(predictions);
              observer.complete();
            } else {
              observer.error([]);
            }
          }
        );
      } else {
        observer.next([]);
        observer.complete();
      }
    });
  }

  /*getAddressSuggestions(query: string) {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;
    const params = {
      input: query,
      key: this.apiKey
    };

    return this.http.get<any>(apiUrl, { params });
  }*/


}