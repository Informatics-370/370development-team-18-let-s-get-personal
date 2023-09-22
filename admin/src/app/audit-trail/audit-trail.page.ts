import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuditTrail } from '../Models/adittrail';
import { AuditTrailService } from '../Services/audittrail.service';
import { AuditTrailVM } from '../ViewModels/audittrailVM';
import { ExcelService } from '../Services/excel.service';
import { ExcelViewModel } from '../ViewModels/excelVM';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts"; 
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-audit-trail',
  templateUrl: './audit-trail.page.html',
  styleUrls: ['./audit-trail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AuditTrailPage implements OnInit {
  AdminAuditTrails: AuditTrailVM[] = []
  EmployeeAuditTrails: AuditTrailVM[] = []
  CustomerAuditTrails: AuditTrailVM[] = []
  searchString: string = "";
  searchedtrail: AuditTrailVM[] = [];

  constructor(private service:AuditTrailService, private excelservice: ExcelService ) 
  {
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit() {
    this.getAdminAuditTrails()
    this.getEmployeeAuditTrails()
    this.getCustomerAuditTrails()
    //this.GetAllTrails()
  }

  SearchForm: FormGroup = new FormGroup({
    name:new FormControl('',[Validators.required])
  })

  search(){  
    let alltrails = this.AdminAuditTrails.concat(this.EmployeeAuditTrails).concat(this.CustomerAuditTrails)

    this.searchString=this.SearchForm.get('name')?.value;

    this.searchedtrail = alltrails.filter(
      f => f.firstName.toLowerCase().includes(this.searchString.toLowerCase()),
      //(f: { surname: string; }) => f.surname.toLowerCase().includes(this.searchString.toLowerCase()), 
    )

    this.AdminAuditTrails = []
    this.EmployeeAuditTrails = [] 
    this.CustomerAuditTrails = []
  }

  getAdminAuditTrails(){
    this.service.GetAdminAuditTrails().subscribe(result => {
      this.AdminAuditTrails = result as AuditTrailVM[]
    })
  }

  getEmployeeAuditTrails(){
    this.service.GetEmployeeAuditTrails().subscribe(result => {
      this.EmployeeAuditTrails = result as AuditTrailVM[]
    })
  }

  getCustomerAuditTrails(){
    this.service.GetEmployeeAuditTrails().subscribe(result => {
      this.CustomerAuditTrails = result as AuditTrailVM[]
    })
  }

  getOnlyAdmins(){
    this.getAdminAuditTrails()
    this.EmployeeAuditTrails = [] 
    this.CustomerAuditTrails = []
  }

  getOnlyCustomers(){
    this.getCustomerAuditTrails()
    this.EmployeeAuditTrails = [] 
    this.AdminAuditTrails = []
  }

  getOnlyEmployees(){
    this.getEmployeeAuditTrails()
    this.AdminAuditTrails = []
    this.CustomerAuditTrails = []
  }

  getAll(){
    this.reloadPage()
  }

  reloadPage(){
    window.location.reload()
  }

  // excelData: ExcelViewModel[] = []
  exportToExcel() 
  {
    try
    {      
      let user = JSON.parse(JSON.stringify(localStorage.getItem('username')))
      let date = new Date
      date.setHours(0, 0, 0, 0)
      console.log(date)
      this.excelservice.exportToExcel(this.AdminAuditTrails, user + 'Admin-Audit-Trail'); // + date
    }
    catch
    {
      //this.ExcelDownloadErrorAlert()
    }    
  }

  generatePDF() {  
    let user = JSON.parse(JSON.stringify(localStorage.getItem('username')))
    let date = new Date
    
    let docDefinition = {  
      fillColor: "White",
      fillOpacity: "",
      margin: [ 5, 10, 5, 5 ],
      header: user+" - It's Personal Audit Trail",  
      footer:'Downloaded by: '+ user + ' at: '+ date,        
      content:[
        {          
          layout: 'lightHorizontalLines', // optional          
          table: {
            headerRows: 1,
            widths: [ '30%', '40%', '30%' ],
            // margin: [left, top, right, bottom]
            margin: [ 5, 10, 5, 5 ],
            
            body: [
              [ 'User', 'Action Description', 'Action Date and Time' ],
              ...this.AdminAuditTrails.map(p => ([p.actionName, p.actionName, p.actionDate])),
              ...this.EmployeeAuditTrails.map(p => ([p.actionName, p.actionName, p.actionDate])),
              ...this.CustomerAuditTrails.map(p => ([p.actionName, p.actionName, p.actionDate]))
            ]
          }          
        }
      ]      
    };  
    pdfMake.createPdf(docDefinition).download();      
  }


}
