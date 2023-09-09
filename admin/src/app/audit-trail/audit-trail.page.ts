import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuditTrail } from '../Models/adittrail';
import { AuditTrailService } from '../Services/audittrail.service';
import { AuditTrailVM } from '../ViewModels/audittrailVM';

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

  constructor(private service:AuditTrailService ) { }

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
    this.EmployeeAuditTrails = [] 
    this.reloadPage()
  }

  getOnlyEmployees(){
    this.AdminAuditTrails = []
    this.reloadPage()
  }

  getAll(){
    this.getAdminAuditTrails()
    this.getEmployeeAuditTrails()
    this.reloadPage()
  }

  reloadPage(){
    window.location.reload()
  }

}
