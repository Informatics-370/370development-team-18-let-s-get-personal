import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController, ModalController, IonModal } from '@ionic/angular';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { Customer } from 'src/app/Models/customer';
import { Employee } from 'src/app/Models/employee';
import { UserProfileDataService } from '../Services/userprofile.service';
import { Admin } from '../Models/admin';
// 

import { DatePipe } from '@angular/common';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.page.html',
  styleUrls: ['./profiles.page.scss'],
  standalone: true,
  providers: [DatePipe],
  imports: [IonicModule, CommonModule, FormsModule, RouterModule,ReactiveFormsModule]
})
export class ProfilesPage implements OnInit {
  Profile: User[] = []
  admin: Admin [] = []
  searchedAdmin: Admin [] = []
  customers: Customer[] = []
  searchedCustomer: Customer[] = []
  employees: Employee[] = []
  searchedEmployee: Employee[] = []
  employee: any
  searchString: string = "";
  @ViewChild(IonModal) modal!: IonModal

  constructor( private alertController:AlertController, private service: UserProfileDataService, 
    public modalCtrl: ModalController, public router: Router) 
  {
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
  } 

  isLoading: boolean = false;
    SearchForm: FormGroup = new FormGroup({
      name:new FormControl('',[Validators.required])
    })

    searchAdmin(){
      this.searchString=this.SearchForm.get('name')?.value;
      this.searchedAdmin = this.admin.filter(
        f => f.firstName.toLowerCase().includes(this.searchString.toLowerCase()));
    }

    searchEmployee(){
      this.searchString=this.SearchForm.get('name')?.value;
      this.searchedEmployee = this.employees.filter(
        f => f.firstName.toLowerCase().includes(this.searchString.toLowerCase()));
    }

    searchCustomer(){
      this.searchString=this.SearchForm.get('name')?.value;
      this.searchedCustomer = this.customers.filter(
        f => f.firstName.toLowerCase().includes(this.searchString.toLowerCase()));
        
    }

  ngOnInit() {
    this.isLoading=true;  
    this.GetEmployees()
    this.GetCustomers()
    this.GetAdmins()
    if(this.searchString === "")
    {
      this.searchedAdmin = this.admin;
      this.searchedEmployee = this.employees;
      this.searchedCustomer = this.customers;
    }
  }

  routeEmployees(){
    this.router.navigate(['./tabs/view-employees']);
  }

  routeAudit(){
    this.router.navigate(['./tabs/audit-trail']);
  }

  GetAdmins(){
    this.service.GetAllAdmins().subscribe(result =>{
      this.admin = result as Admin[];
      this.searchedAdmin=this.admin;
      console.log(this.employees);
    })
  }

  GetEmployees(){
    this.service.GetAllEmployees().subscribe(result =>{
      this.employees = result as Employee[];
      this.searchedEmployee=this.employees;
      console.log(this.employees);
      this.isLoading=false;  
    })
  }

  GetCustomers(){
    this.service.GetAllCustomers().subscribe(result =>{
      this.customers = result as Customer[];
      this.searchedCustomer=this.customers;
      console.log(this.customers);
    })
  }

  

  async generateUserPDF() {  
    let user = JSON.parse(JSON.stringify(localStorage.getItem('username')))
    let date = new Date
    let docDefinition = {  
      fillColor: "White",
      fillOpacity: "",
      margin: [ 5, 10, 5, 5 ],
      header: user +" - It's Personal Customer List",  
      footer:'Downloaded by: '+ user + ' at: '+ date,        
      content:[
        // {
        //   image: 'data: assets/Logo.png',
        //   width: 150,
        // },
        {           
          layout: 'lightHorizontalLines', // optional          
          table: {
            headerRows: 1,
            widths: [ '16.5%', '16.5%', '16.5%', '16.5%', '16.5%', '16.5%' ],
            // margin: [left, top, right, bottom]
            margin: [ 5, 10, 5, 5 ],
            
            body: [
              [ 'Username', 'First Name', 'Last Name', 'Email Address', 'Cell Number', 'Date Registered' ],
              ['Customers:', '', '', '','', ''],
              ...this.customers.map(p => ([p.username, p.firstName, p.surname, p.email, p.cell_Number, p.date_Registered])),
              ['', '', '', '','', ''],
              ['Employees:', '', '', '','', ''],
              ...this.employees.map(p => ([p.username, p.firstName, p.surname, p.email, p.cell_Number, p.date_Registered])),
              ['', '', '', '','', ''],
              ['Admins:', '', '', '','', ''],
              ...this.admin.map(p => ([p.username, p.firstName, p.surname, p.email, p.cell_Number, p.date_Registered]))
            ]
          }          
        }
      ]      
    };  
    pdfMake.createPdf(docDefinition).download();      
  }

  generateCustomerPDF() {  
    let user = JSON.parse(JSON.stringify(localStorage.getItem('username')))
    let date = new Date
    
    let docDefinition = {  
      fillColor: "White",
      fillOpacity: "",
      margin: [ 5, 10, 5, 5 ],
      header: user+" - It's Personal Customer List",  
      footer:'Downloaded by: '+ user + ' at: '+ date,        
      content:[
        {          
          layout: 'lightHorizontalLines', // optional          
          table: {
            headerRows: 1,
            //widths: [ '30%', '40%', '30%' ],
            // margin: [left, top, right, bottom]
            margin: [ 5, 10, 5, 5 ],
            
            body: [
              [ 'Username', 'First Name', 'Last Name', 'Email Address', 'Cell Number', 'Date Registered' ],
              ...this.customers.map(p => ([p.username, p.firstName, p.surname, p.email, p.cell_Number, p.date_Registered]))
            ]
          }          
        }
      ]      
    };  
    pdfMake.createPdf(docDefinition).download();      
  }

  generateEmployeePDF(){
    let user = JSON.parse(JSON.stringify(localStorage.getItem('username')))
    let date = new Date
    
    let docDefinition = {  
      fillColor: "White",
      fillOpacity: "",
      margin: [ 5, 10, 5, 5 ],
      header: user+" - It's Personal Employee List",  
      footer:'Downloaded by: '+ user + ' at: '+ date,        
      content:[
        {          
          layout: 'lightHorizontalLines', // optional          
          table: {
            headerRows: 1,
            //widths: [ '30%', '40%', '30%' ],
            // margin: [left, top, right, bottom]
            margin: [ 5, 10, 5, 5 ],
            
            body: [
              [ 'Username', 'First Name', 'Last Name', 'Email Address', 'Cell Number', 'Date Registered' ],
              ...this.employees.map(p => ([p.username, p.firstName, p.surname, p.email, p.cell_Number, p.date_Registered]))
            ]
          }          
        }
      ]      
    };  
    pdfMake.createPdf(docDefinition).download(); 
  }

  generateAdminPDF(){
    let user = JSON.parse(JSON.stringify(localStorage.getItem('username')))
    let date = new Date
    
    let docDefinition = {  
      fillColor: "White",
      fillOpacity: "",
      margin: [ 5, 10, 5, 5 ],
      header: user+" - It's Personal Admin List",  
      footer:'Downloaded by: '+ user + ' at: '+ date,        
      content:[
        {          
          layout: 'lightHorizontalLines', // optional          
          table: {
            headerRows: 1,
            //widths: [ '30%', '40%', '30%' ],
            // margin: [left, top, right, bottom]
            margin: [ 5, 10, 5, 5 ],
            
            body: [
              [ 'Username', 'First Name', 'Last Name', 'Email Address', 'Cell Number', 'Date Registered' ],
              ...this.admin.map(p => ([p.username, p.firstName, p.surname, p.email, p.cell_Number, p.date_Registered]))
            ]
          }          
        }
      ]      
    };  
    pdfMake.createPdf(docDefinition).download(); 
  }


}


