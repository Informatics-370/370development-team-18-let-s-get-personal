import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { ProfileService } from 'src/app/Services/profile.service';
import { IonicModule, AlertController, ModalController, IonModal } from '@ionic/angular';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { User } from 'src/app/Models/user';
import { Customer } from 'src/app/Models/customer';
import { Employee } from 'src/app/Models/employee';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.page.html',
  styleUrls: ['./view-employees.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewEmployeesPage implements OnInit {

  Profile: User[] = []
  customers: Customer[] = []
  employees: Employee[] = []
  employee: any
  @ViewChild(IonModal) modal!: IonModal
  
  constructor( private alertController:AlertController, 
    private empservice: EmployeeService, public modalCtrl: ModalController) { } //private service:ProfileService,

  ngOnInit() {
  //  this.getProfle()
    this.GetAllEmployees()
  } 

  GetAllEmployees(){
    this.empservice.GetAllEmployees().subscribe(result =>{
      this.employees = result as Employee[];
    })
  }
  
  GetEmployee(Employee_ID: string){
    this.empservice.GetEmployee(Employee_ID).subscribe(result => {
      this.employee = result  
      console.log(result);
    })
  }

  DeleteEmployee(Employee_ID: string){
    this.empservice.DeleteEmployee(Employee_ID).subscribe(result => {
      console.log(result);
      if(result == null){
        this.DeleteEmployeeErrorAlert();
      }
      else{
        this.DeleteEmployeeSuccessAlert();
      }
    })    
  }

  async DeleteEmployeeSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Employee Deleted',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async DeleteEmployeeErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Employee Was Not Deleted',
      message: 'Please try again',
      buttons: ['OK'],
    });
    await alert.present();
  }

}
