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
  newpassword: new FormControl('',[Validators.required]),
  confirmpassword: new FormControl('',[Validators.required]),
})

ChangePassword(isOpen: boolean){
  this.isPassModalOpen = isOpen;
}

confirmpassmodal(){
  let username = JSON.parse(JSON.stringify(localStorage.getItem('username')));
  let newpassword = new ChangePasswordVM()
  newpassword.userName = username
  newpassword.oldPassword = this.passwordform.value.oldpassword
  newpassword.newPassword = this.passwordform.value.newpassword
  newpassword.confirmPassword = this.passwordform.value.confirmpassword

  this.authservice.ChangeUserPassword(newpassword).subscribe(result =>{
    this.editSuccessAlert()
  },(error) => {
    this.editErrorAlert();        
    console.error('Edit stock image error:', error);
  })
}

cancelpassmodal() {
  this.isPassModalOpen = false;
}




//========== edit ==========
  isModalOpen = false;
  editCustomer: Customer = new Customer();
  editForm: FormGroup = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    surname: new FormControl('',[Validators.required]),
    cell_Number: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    // username: new FormControl('',[Validators.required]),
  })

  public updateProfile(customer_ID:string, isOpen: boolean) {
    this.service.GetCustomer(customer_ID).subscribe(response => {         
      this.editCustomer = response as Customer;

      this.editForm.controls['firstName'].setValue(this.editCustomer.firstName);
      this.editForm.controls['surname'].setValue(this.editCustomer.surname);
      this.editForm.controls['cell_Number'].setValue(this.editCustomer.cell_Number);
      this.editForm.controls['email'].setValue(this.editCustomer.email);
      // this.editForm.controls['username'].setValue(this.editCustomer.username);
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
      // editedCustomer.username = this.editForm.value.username;

      this.service.UpdateCustomer(this.editCustomer.customer_ID, editedCustomer).subscribe(result =>{
        
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
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete your profile?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        // handler:() =>{
        //   this.reloadPage(); 
        // }
    }, {
      text: 'Continue',
      role: 'cancel',
      handler:() =>{
        this.deleteProfile(this.customerID); 
      }
  }],
    });
    await alert.present();
  }

  public deleteProfile(customer_ID: string) {
    try{
      // this.service.DeleteCustomer(customer_ID).subscribe(result =>{
      //   console.log(result);
      // })

      this.authservice.DeleteUser(this.username).subscribe(result =>{
        console.log(result);
      })

      this.Logout()
    }
    catch{

    }
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

  // async HelpAlert() {
  //   const alert = await this.alertController.create({
  //     header: 'Success!',
  //     subHeader: 'Updated',
  //     buttons: [{
  //       text: 'OK',
  //       role: 'cancel',
  //       handler:() =>{
  //         this.reloadPage(); 
  //       }
  //   }],
  //   });
  //   await alert.present();
  // }

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
      header: 'We are sorry!',
      subHeader: 'Updated Failed',
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

  reloadPage(){
    window.location.reload()
  }
}
