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

    //Inventory
    async exportToExcel(data: any, filename: any) {
      {    
        const Heading = [
          ['Product Name', 'Product Price', 'Product Size', 'Quantity In Stock', 
          'Date Added', 'Inventory Comments', 'Product Type', 'Product Colour', 'Product Image Name']
        ];  

          //const XLSX = require('xlsx');    
          const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);   //, { skipHeader: true }         
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.sheet_add_aoa(ws, Heading, { origin: 'A1' });
          XLSX.utils.book_append_sheet(wb, ws, filename);
          XLSX.writeFile(wb, filename + '.xlsx');
      }
    }

    public GetInventoryList(): Observable<any>{ 
        return this.httpClient.get(`${this.apiUrl}Excel/GetInventoryList`)
        .pipe(map(result => result))
    }

//       const XLSX = require('xlsx');
// const wb = XLSX.utils.book_new();
    
// const Heading = [
//     ['Sr No', 'User Name', 'Department', 'Bank', 'Country', 'Region', 'Amount']
// ];
    
// // creating sheet and adding data from 2nd row of column A.
// // leaving first row to add Heading
// const ws = XLSX.utils.json_to_sheet(data, { origin: 'A2', skipHeader: true });
    
// // adding heading to the first row of the created sheet.
// // sheet already have contents from above statement.
// XLSX.utils.sheet_add_aoa(ws, Heading, { origin: 'A1' });
    
// // appending sheet with a name
// XLSX.utils.book_append_sheet(wb, ws, 'Records');
    
// const fileContent = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
}
