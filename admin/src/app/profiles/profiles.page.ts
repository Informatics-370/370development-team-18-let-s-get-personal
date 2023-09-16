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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DatePipe } from '@angular/common';
export type jsPDFDocument = any;
type Opts = { [key: string]: string | number }
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.page.html',
  styleUrls: ['./profiles.page.scss'],
  standalone: true,
  providers: [DatePipe],
  imports: [IonicModule, CommonModule, FormsModule, RouterModule,ReactiveFormsModule]
})
export class ProfilesPage implements OnInit {
  private readonly jsPDFDocument: jsPDFDocument
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
    public modalCtrl: ModalController, public router: Router) { } 

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
    })
  }

  GetCustomers(){
    this.service.GetAllCustomers().subscribe(result =>{
      this.customers = result as Customer[];
      this.searchedCustomer=this.customers;
      console.log(this.customers);
    })
  }

  @ViewChild('userData') userData!: ElementRef;
  
  openPDF(): void {
    let DATA: any = document.getElementById('userData');
    html2canvas(DATA).then((canvas) => {       
      //Initialize JSPDF
      let PDF = new jsPDF('p', 'mm', 'a4');
      //Converting canvas to Image
      const FILEURI = canvas.toDataURL('image/png');
      //Add image Canvas to PDF
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;      
      let position = 10;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);        
          
      PDF.save('IPKP-Users.pdf');
    });
  }

}
