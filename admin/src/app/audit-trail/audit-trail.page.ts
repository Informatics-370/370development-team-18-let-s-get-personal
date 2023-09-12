import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuditTrail } from '../Models/adittrail';
import { AuditTrailService } from '../Services/audittrail.service';
import { AuditTrailVM } from '../ViewModels/audittrailVM';
import { ExcelService } from '../Services/excel.service';
import { ExcelViewModel } from '../ViewModels/excelVM';
@Component({
  selector: 'app-audit-trail',
  templateUrl: './audit-trail.page.html',
  styleUrls: ['./audit-trail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AuditTrailPage implements OnInit {
  AdminAuditTrails: AuditTrailVM[] = []
  EmployeeAuditTrails: AuditTrailVM[] = []

  constructor(private service:AuditTrailService, private excelservice: ExcelService ) { }

  ngOnInit() {
    this.getAdminAuditTrails()
    this.getEmployeeAuditTrails()
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

  getOnlyAdmins(){
    this.getAdminAuditTrails()
    this.EmployeeAuditTrails = [] 
    //this.reloadPage()
  }

  getOnlyEmployees(){
    this.getEmployeeAuditTrails()
    this.AdminAuditTrails = []
    //this.reloadPage()
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


}