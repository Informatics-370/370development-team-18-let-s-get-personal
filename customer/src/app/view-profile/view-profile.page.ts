import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController,AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserProfileDataService } from '../Services/userprofile.service';
import { Customer } from '../Models/customer';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordVM } from '../ViewModels/changepasswordVM';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ViewProfilePage implements OnInit {
  customer: Customer = new Customer()
  @ViewChild(IonModal) modal!: IonModal
  public username: string = ""

  constructor(private _modalController: ModalController, private _router: Router, public modalCtrl: ModalController,
    private alertController:AlertController, private service: UserProfileDataService, private authservice: AuthenticationService)  { }

  ngOnInit() {
    this.getUser()
  }

  getUser()
  {
    this.username = JSON.parse(JSON.stringify(localStorage.getItem('username')));
    let customer_ID = JSON.parse(JSON.stringify(localStorage.getItem('customerID')));

    this.service.GetCustomer(customer_ID).subscribe(result => {
      this.customer = result as Customer;
      console.log(this.customer)
    })

  }

//========== Change password ==========
isPassModalOpen = false;
passwordform: FormGroup = new FormGroup({
  // username: new FormControl('',[Validators.required]),
  oldpassword: new FormControl('',[Validators.required]),
  newpassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),
  confirmpassword:new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),
}, { validators: this.passwordMatchValidator 
  })

passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const newPassword = control.get('newpassword');
  const confirmNewPassword = control.get('confirmpassword');

  if (newPassword && confirmNewPassword && newPassword.value !== confirmNewPassword.value) {
    return { 'passwordMismatch': true };
  }

  return null;
}

ChangePassword(isOpen: boolean){
  this.isPassModalOpen = isOpen;
}

get f() { return this.passwordform.controls }

confirmpassmodal(){
  let username = JSON.parse(JSON.stringify(localStorage.getItem('username')));
  let newpassword = new ChangePasswordVM()
  newpassword.userName = username
  newpassword.oldPassword = this.passwordform.value.oldpassword
  newpassword.newPassword = this.passwordform.value.newpassword
  newpassword.confirmPassword = this.passwordform.value.confirmpassword

  if(newpassword.newPassword === newpassword.confirmPassword) 
  {
    this.authservice.ChangeUserPassword(newpassword).subscribe(result =>{
      this.editSuccessAlert()
    },(error) => {
      this.editErrorAlert();        
      console.error('Edit stock image error:', error);
    })
  }
  else{
    this.PasswordMatchErrorAlert()
  }  
}

cancelpassmodal() {
  this.isPassModalOpen = false;
}



get g() { return this.editForm.controls }
//========== edit ==========
  isModalOpen = false;
  editCustomer: Customer = new Customer();
  editForm: FormGroup = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    surname: new FormControl('',[Validators.required]),
    cell_Number:new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(12), Validators.pattern('[- +()0-9]{9,}')])),
    email:new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),
    username: new FormControl('',[Validators.required]),
  })



  public updateProfile(customer_ID:string, isOpen: boolean) {
    this.service.GetCustomer(customer_ID).subscribe(response => {         
      this.editCustomer = response as Customer;

      this.editForm.controls['firstName'].setValue(this.editCustomer.firstName);
      this.editForm.controls['surname'].setValue(this.editCustomer.surname);
      this.editForm.controls['cell_Number'].setValue(this.editCustomer.cell_Number);
      this.editForm.controls['email'].setValue(this.editCustomer.email);
      this.editForm.controls['username'].setValue(this.editCustomer.username);
    })    
    this.isModalOpen = isOpen;
  }

  confirmeditmodal(){
    try
    {
      let editedCustomer = new Customer();
      editedCustomer.firstName = this.editForm.value.firstName;
      editedCustomer.surname = this.editForm.value.surname;
      editedCustomer.cell_Number = this.editForm.value.cell_Number;
      editedCustomer.email = this.editForm.value.email;
      editedCustomer.username = this.editForm.value.username;

      this.service.UpdateCustomer(this.editCustomer.customer_ID, editedCustomer).subscribe(result =>{
        console.log(result);
      }) 
      
      this.editSuccessAlert();     
    }
    catch{      
      this.editErrorAlert();
    }    
  }

  canceleditmodal() {
    this.isModalOpen = false;
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

//==========Delete ===========
  customerID!: string
  async DeleteConfirmAlert(customer_ID: string) {
    this.customerID = customer_ID
    console.log(this.customerID)
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete your profile?',
      buttons: [{
        text: 'Continue',
        role: 'cancel',
        handler:() =>{
          this.deleteProfile(); 
        }
      },{
        text: 'Cancel',
        role: 'cancel'
      }],
    });
    await alert.present();
  }

  public deleteProfile() {
    this.service.DeleteCustomer(this.customerID).subscribe(result =>{
      console.log(result);
      this.DeleteSuccessAlert()
    },(error) => {
      this.deleteErrorAlert();        
      console.error(error);
    })
  }
  
  public PreviousOrders() {
    this._router.navigate(["/tabs/previous-orders"])
  }
  public ExpRating() {
    this._router.navigate(["/tabs/experience-rating"])
  }

  public Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('customerID');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    localStorage.removeItem('name');
    
    // this.currentUser.next(false);
    // this.router.navigateByUrl('/login', {replaceUrl: true});
    localStorage.removeItem('quantity');
    localStorage.removeItem('cartItemCount');
    localStorage.removeItem('cart');
    localStorage.removeItem('selectedItem');
    localStorage.removeItem('Image-URL');
    //this.reloadPage();
    this._router.navigate(["/tabs/login"])
  }

  async DeleteSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Your Account Has Been Deleted',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler:() =>{
          this.Logout(); 
        }
    }],
    });
    await alert.present();
  }

  async PasswordMatchErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Your new passwords do not match!',
      // subHeader: 'Something went wrong',
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

  async editSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      // subHeader: 'Updated',
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
      header: 'Password Update Failed!',
      subHeader: 'Ensure you entered the correct current password.',
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

  async deleteErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'We could not delete your profile',
      message: 'Please note that we cannot delete your profile if you have an active order.',
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

  async HelpAlert() {
    const alert = await this.alertController.create({
      header: 'Please Note: ',
      subHeader: 'If you would like to view your previous orders, please download our app!',
      message: 'This is where you can also rate our products and services',
      buttons: [{
          text: 'OK',
          role: 'cancel',
      }],
    });
    await alert.present();
  }

  reloadPage(){
    window.location.reload()
  }
}
