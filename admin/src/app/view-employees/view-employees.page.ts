import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { IonicModule, AlertController, ModalController, IonModal } from '@ionic/angular';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
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
  register: RegisterVM[] = []
  //Profile: User[] = []
  employees: Employee[] = []
  employee: any
  @ViewChild(IonModal) modal!: IonModal
  
  constructor( private alertController:AlertController, public modalCtrl: ModalController,
    private empservice: UserProfileDataService, public authservice: AuthenticationService, public router: Router) { } 
    //private service:ProfileService,

  ngOnInit() {
    //  this.getProfle()
    this.GetAllEmployees()
  }

  backButton() {
    this.router.navigate(['./tabs/profiles']);
  }

  AddEmployeeForm: FormGroup = new FormGroup({
    FirstName: new FormControl('', [Validators.required]),
    Surname: new FormControl('', [Validators.required]),
    Email: new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),
    Cell_Number: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(12)])), //, Validators.pattern("^(\\+27|0)[6-8][0-9]{8}$")
    Username: new FormControl('', [Validators.required]),
    // Password: new FormControl('',Validators.compose([Validators.required,Validators.minLength(8),Validators.pattern('(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[$@$!%?&])[A-Za-zd$@$!%?&].{8,15}')])),
    Password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')])
  })

  get f() { return this.AddEmployeeForm.controls }

  GetAllEmployees() {
    this.empservice.GetAllEmployees().subscribe(result => {
      this.employees = result as Employee[];
    })
  }
  
  GetEmployee(Employee_ID: string){
    this.empservice.GetEmployee(Employee_ID).subscribe(result => {
      this.employee = result
      console.log(result);
    })
  }
  
  DeleteEmployee(employee_ID: string, username: string){  
        
    this.empservice.DeleteEmployee(employee_ID).subscribe(result => {
      console.log(result);
      this.DeleteEmployeeSuccessAlert();
    },(error) => {
      this.DeleteEmployeeErrorAlert();        
      console.error('Edit stock image error:', error);
    })    

  }

  AddEmployee() {
    if (this.AddEmployeeForm.valid) {
      const formData = this.AddEmployeeForm.value;
      console.log(formData);

      let addemployee = new RegisterVM()
      addemployee.firstName = this.AddEmployeeForm.value.FirstName
      addemployee.surname = this.AddEmployeeForm.value.Surname
      addemployee.email = this.AddEmployeeForm.value.Email
      addemployee.cell_Number = this.AddEmployeeForm.value.Cell_Number
      addemployee.username = this.AddEmployeeForm.value.Username
      addemployee.password = this.AddEmployeeForm.value.Password

      this.authservice.RegisterEmployee(addemployee).subscribe(result => {
        this.AddEmployeeSuccessAlert()
        console.log(this.AddEmployee)
      },
        (error) => {
          // Handle registration error
          this.AddEmployeeErrorAlert()
          console.error('Registration error:', error);
        }
      );
    }
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

  reloadPage() {
    window.location.reload()
  }

  //=========== edits
  isModalOpen = false;
  editEmployee: Employee = new Employee();

  editForm: FormGroup = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    surname: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    cell_Number: new FormControl(''),
    username: new FormControl('',[Validators.required])
  })

  EditEmployee(employee_ID:string, isOpen: boolean)
  {    
    this.empservice.GetEmployee(employee_ID).subscribe(response => {         
      this.editEmployee = response as Employee;

      this.editForm.controls['firstName'].setValue(this.editEmployee.firstName);
      this.editForm.controls['surname'].setValue(this.editEmployee.surname);
      this.editForm.controls['email'].setValue(this.editEmployee.email);
      this.editForm.controls['cell_Number'].setValue(this.editEmployee.cell_Number);
      this.editForm.controls['username'].setValue(this.editEmployee.username);
    })
    
    this.isModalOpen = isOpen;
  }

  confirmeditmodal(){
    try
    {
      let editedEmployee = new Employee();
      editedEmployee.firstName = this.editForm.value.firstName;
      editedEmployee.surname = this.editForm.value.surname;
      editedEmployee.email = this.editForm.value.email;
      editedEmployee.cell_Number = this.editForm.value.cell_Number;
      editedEmployee.username = this.editForm.value.username;

      this.empservice.UpdateEmployee(this.editEmployee.employee_ID, editedEmployee).subscribe(result =>{
        this.editSuccessAlert();
      },(error) => {
        this.editErrorAlert();        
        console.error('Edit employee error:', error);
      })
    }
    catch{      
      this.editErrorAlert();
    }    
  }

  canceleditmodal() {
    this.isModalOpen = false;
  }

  //=========== alerts
  async DeleteHelpAlert() {
    const alert = await this.alertController.create({
      header: 'Please Note',
      subHeader: 'Deleting an Employee will remove their login, personal and audit trail details from the system',
      message: 'If you would like to keep a record of what they did on the system please download the audit trail and then proceed to delete.',
      buttons: 
      [{
        text: 'OK',
        role: 'cancel'
      },
      {
        text: 'Got To Audit Trail',
        /*role: 'cancel',*/
        handler:() =>{
          this.auditTrailNav();
        }
      }],
    });
    await alert.present();
  }

  async editSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Employee Updated',
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

  async editErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Employee Was Not Updated',
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

  async DeleteEmployeeSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Employee Deleted',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
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
        handler: () => {
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
        handler: () => {
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
        handler: () => {
          this.reloadPage();
        }
      }],
    });
    await alert.present();
  }

  auditTrailNav() {
    this.router.navigate(['./tabs/audit-trail']);
  }

}
