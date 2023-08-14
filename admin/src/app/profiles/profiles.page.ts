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
export type jsPDFDocument = any;
type Opts = { [key: string]: string | number }
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.page.html',
  styleUrls: ['./profiles.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class ProfilesPage implements OnInit {
  private readonly jsPDFDocument: jsPDFDocument
  Profile: User[] = []
  admin: Admin [] = []
  customers: Customer[] = []
  employees: Employee[] = []
  employee: any
  @ViewChild(IonModal) modal!: IonModal

  constructor( private alertController:AlertController, private service: UserProfileDataService, 
    public modalCtrl: ModalController, public router: Router) { } 

  ngOnInit() {
    this.GetEmployees()
    this.GetCustomers()
    this.GetAdmins()
  }

  routeEmployees(){
    this.router.navigate(['./tabs/view-employees']);
  }

  GetAdmins(){
    this.service.GetAllAdmins().subscribe(result =>{
      this.admin = result as Admin[];
      console.log(this.employees);
    })
  }

  GetEmployees(){
    this.service.GetAllEmployees().subscribe(result =>{
      this.employees = result as Employee[];
      console.log(this.employees);
    })
  }

  GetCustomers(){
    this.service.GetAllCustomers().subscribe(result =>{
      this.customers = result as Customer[];
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
