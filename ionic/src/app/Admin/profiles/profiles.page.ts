import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from 'src/app/Services/profile.service';
import { IonicModule, AlertController, ModalController, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { elementAt, isEmpty } from 'rxjs';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from 'src/app/Models/user';
import { Customer } from 'src/app/Models/customer';
import { Employee } from 'src/app/Models/employee';
import { EmployeeService } from 'src/app/Services/employee.service';
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.page.html',
  styleUrls: ['./profiles.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilesPage implements OnInit {
  
  Profile: User[] = []
  customers: Customer[] = []
  employees: Employee[] = []
  employee: any
  @ViewChild(IonModal) modal!: IonModal
  
  constructor(private service:ProfileService, private alertController:AlertController, 
    private empservice: EmployeeService, public modalCtrl: ModalController) { }

  ngOnInit() {
  //  this.getProfle()
    this.GetAllEmployees()
  } 

  GetAllEmployees(){
    this.empservice.GetAllEmployees().subscribe(result =>{
      this.employees = result as Employee[];
    })
  }

  GetEmployee(Employee_ID: Number){
    this.empservice.GetEmployee(Employee_ID).subscribe(result => {
      this.employee = result  
      console.log(result);
    })
  }

  DeleteEmployee(Employee_ID: Number){
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

