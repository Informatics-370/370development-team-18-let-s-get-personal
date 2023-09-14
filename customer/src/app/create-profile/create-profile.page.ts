import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Customer } from '../Models/customer';
import { RegisterVM } from '../ViewModels/registerVM';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.page.html',
  styleUrls: ['./create-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, RouterModule]
})
export class CreateProfilePage implements OnInit {
  data = { profileId: 0, email: '', password: '', cellnumber: '', Firstname: '', Lastname: '' };
  constructor(private service: AuthenticationService, private alertController: AlertController, private _router: Router,public loadingController: LoadingController) { }
  customer: Customer[] = []
  ngOnInit() {
  }

  AddCustomerForm: FormGroup = new FormGroup({
    FirstName: new FormControl('', [Validators.required]),
    Surname: new FormControl('', [Validators.required]),
    Email: new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),
    //Cell_Number: new FormControl('',Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(12),Validators.pattern("^(\\+27|0)[6-8][0-9]{8}$")])),
    Cell_Number: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(12), Validators.pattern('[- +()0-9]{9,}')])),
    Username: new FormControl('', [Validators.required]),
    //Password: new FormControl('',Validators.compose([Validators.required,Validators.minLength(8),Validators.pattern('(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[$@$!%?&])[A-Za-zd$@$!%?&].{8,15}')]))
    Password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')])
  })

  get f() { return this.AddCustomerForm.controls }

  isLoading: boolean = false;
  AddProfile() {
    this.isLoading = true;
    if (this.AddCustomerForm.valid) {
      const formData = this.AddCustomerForm.value;
      console.log(formData);

      let addcustomer = new RegisterVM()
      addcustomer.firstName = this.AddCustomerForm.value.FirstName
      addcustomer.surname = this.AddCustomerForm.value.Surname
      addcustomer.email = this.AddCustomerForm.value.Email
      addcustomer.cell_Number = this.AddCustomerForm.value.Cell_Number
      addcustomer.username = this.AddCustomerForm.value.Username
      addcustomer.password = this.AddCustomerForm.value.Password

      this.service.RegisterCustomer(addcustomer).subscribe(result => {
        this.AddCustomerSuccessAlert();
        console.log(addcustomer)
        this._router.navigate(['./tabs/login']);
      },
      (error) => {
        this.AddCustomerErrorAlert();
        console.error('Registration error:', error);
      }).add(() => {
        this.isLoading = false; // Stop loading
      });
      //this.presentLoading();
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Registering...',
      duration: 4000,
      backdropDismiss: true,
    });
    
    await loading.present();
  
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  } 

  async AddCustomerSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: "You've been Registered",
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler:() =>{
          this._router.navigate(['./tabs/login']);;
        }
      }],
    });
    await alert.present();
  }

  async AddCustomerErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Registration failed',
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
