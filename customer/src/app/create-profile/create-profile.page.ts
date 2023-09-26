import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { IonicModule, AlertController, ModalController, IonModal } from '@ionic/angular';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Customer } from '../Models/customer';
import { RegisterVM } from '../ViewModels/registerVM';
@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.page.html',
  styleUrls: ['./create-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule]
})
export class CreateProfilePage implements OnInit {
  data = {profileId: 0, email: '', password: '', cellnumber: '', Firstname: '', Lastname: ''};
  constructor(private service:AuthenticationService, private alertController:AlertController) { }
  customer: Customer[] =[]
  ngOnInit() {
  }

  AddCustomerForm: FormGroup = new FormGroup({
    FirstName: new FormControl('',[Validators.required]),
    Surname: new FormControl('',[Validators.required]),
    Email: new FormControl('',[Validators.required]),    
    Cell_Number: new FormControl('',[Validators.required]),
    Username: new FormControl('',[Validators.required]),
    Password: new FormControl('',[Validators.required]),
  })

  AddProfile(){
    let addcustomer = new RegisterVM()
    addcustomer.firstName = this.AddCustomerForm.value.FirstName
    addcustomer.surname = this.AddCustomerForm.value.Surname
    addcustomer.email = this.AddCustomerForm.value.Email
    addcustomer.cell_Number = this.AddCustomerForm.value.Cell_Number
    addcustomer.username = this.AddCustomerForm.value.Username
    addcustomer.password = this.AddCustomerForm.value.Password

    this.service.RegisterCustomer(addcustomer).subscribe(result => {
      if(result.status == "Error")
        {
          this.AddEmployeeErrorAlert()
        }        
      else if(result.status == "Success")
        {
          this.AddEmployeeSuccessAlert()
          console.log(addcustomer)
        }
    }) 
  }
  async AddEmployeeSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Employee Added',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        // handler:() =>{
        //   this.reloadPage();
        // }
      }],
    });
    await alert.present();
  }

<<<<<<< HEAD
  async AddEmployeeErrorAlert() {
=======
  async AddCustomerSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: "You've been Registered",
      message:'Proceed to verify your email address.',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler:() =>{
          //this._router.navigate(['./tabs/register-otp']);;
        }
      }],
    });
    await alert.present();
  }

  async AddCustomerErrorAlert() {
>>>>>>> developer
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Employee Was Not Added',
      message: 'Please try again',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        // handler:() =>{
        //   this.reloadPage();
        // }
      }],
    });
    await alert.present();
  }

}
