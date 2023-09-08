import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import * as XLSX from 'xlsx';

@Injectable({
providedIn: 'root'
})
export class ExcelService {
    apiUrl = 'https://localhost:44390/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }

    constructor(private httpClient: HttpClient) { }

    async exportToExcel(data: any, filename: any) {
        {           
            const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);            
            const wb: XLSX.WorkBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, filename);
            XLSX.writeFile(wb, filename + '.xlsx');
        }
    }

    public GetInventoryList(): Observable<any>{ 
        return this.httpClient.get(`${this.apiUrl}Excel/GetInventoryList`)
        .pipe(map(result => result))
      }
}
