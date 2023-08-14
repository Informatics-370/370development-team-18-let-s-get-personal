import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { ProfileService } from 'src/app/Services/profile.service';
import { IonicModule, AlertController, ModalController, IonModal } from '@ionic/angular';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { User } from 'src/app/Models/user';
import { Customer } from 'src/app/Models/customer';
import { Employee } from 'src/app/Models/employee';
import { UserProfileDataService } from '../Services/userprofile.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { AuthenticationService } from '../Services/authentication.service';
import { RegisterVM } from '../ViewModels/registerVM';
@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.page.html',
  styleUrls: ['./view-employees.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ViewEmployeesPage implements OnInit {
  register: RegisterVM[] =[]
  //Profile: User[] = []
  employees: Employee[] = []
  employee: any
  @ViewChild(IonModal) modal!: IonModal
  
  constructor( private alertController:AlertController, 
    private empservice: UserProfileDataService, public modalCtrl: ModalController,
    public authservice: AuthenticationService) { } //private service:ProfileService,

  ngOnInit() {
  //  this.getProfle()
    this.GetAllEmployees()
  } 

  AddEmployeeForm: FormGroup = new FormGroup({
    FirstName: new FormControl('',[Validators.required]),
    Surname: new FormControl('',[Validators.required]),
    Email: new FormControl('',[Validators.required]),    
    Cell_Number: new FormControl('',[Validators.required]),
    Username: new FormControl('',[Validators.required]),
    Password: new FormControl('',[Validators.required]),
  })

  GetAllEmployees(){
    this.empservice.GetAllEmployees().subscribe(result =>{
      this.employees = result as Employee[];
    })
  }
  
  GetEmployee(Employee_ID: number){
    this.empservice.GetEmployee(Employee_ID).subscribe(result => {
      this.employee = result  
      console.log(result);
    })
  }

  AddEmployee(){
    let addemployee = new RegisterVM()
    addemployee.firstName = this.AddEmployeeForm.value.FirstName
    addemployee.surname = this.AddEmployeeForm.value.Surname
    addemployee.email = this.AddEmployeeForm.value.Email
    addemployee.cell_Number = this.AddEmployeeForm.value.Cell_Number
    addemployee.username = this.AddEmployeeForm.value.Username
    addemployee.surname = this.AddEmployeeForm.value.Password

    this.authservice.RegisterEmployee(addemployee).subscribe(result => {
      if(result.status == "Error")
        {
          this.AddEmployeeErrorAlert()
        }        
      else if(result.status == "Success")
        {
          this.AddEmployeeSuccessAlert()
          console.log(this.AddEmployee)
        }
    }) 
  }

  canceladdmodal() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmaddmodal() {
    this.AddEmployee();    
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  reloadPage(){
    window.location.reload()
  }

  DeleteEmployee(Employee_ID: number){
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
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler:() =>{
          this.reloadPage();
        }
      }],
    });
    await alert.present();
  }

  async DeleteEmployeeErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Employee Was Not Deleted',
      message: 'Please try again',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler:() =>{
          this.reloadPage();
        }
      }],
    });
    await alert.present();
  }

  async AddEmployeeSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Employee Added',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler:() =>{
          this.reloadPage();
        }
      }],
    });
    await alert.present();
  }

  async AddEmployeeErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Employee Was Not Added',
      message: 'Please try again',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler:() =>{
          this.reloadPage();
        }
      }],
    });
    await alert.present();
  }

}
