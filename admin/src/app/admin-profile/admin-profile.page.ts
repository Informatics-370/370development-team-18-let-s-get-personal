import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../Services/authentication.service';
import { RouterModule, Router } from '@angular/router';
import { IonicModule, AlertController, ModalController, IonModal } from '@ionic/angular';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserProfileDataService } from '../Services/userprofile.service';
import { Employee } from '../Models/employee';
import { Admin } from '../Models/admin';
import { OverlayEventDetail } from '@ionic/core/components';
import{ChangePasswordVM} from '../ViewModels/changepasswordVM';
@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.page.html',
  styleUrls: ['./admin-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AdminProfilePage implements OnInit {
  public username: string = ""
  employee: Employee = new Employee()
  admin: Admin = new Admin()
  @ViewChild(IonModal) modal!: IonModal
  profile: any
  constructor(private AuthService:AuthenticationService, private router:Router, private service: UserProfileDataService,
    private alertController:AlertController, public modalCtrl: ModalController,)
  {}
  
  ngOnInit() {
    this.getUser()
  }

 
  getUser(){
    this.username = JSON.parse(JSON.stringify(localStorage.getItem('username')));
    let roles = JSON.parse(JSON.stringify(localStorage.getItem('roles')));
    let userID = JSON.parse(JSON.stringify(localStorage.getItem('userID')));

    if(roles.includes('Admin')){
      this.service.GetAdminDetails(userID).subscribe(result=>{
        this.profile = result as Admin;
        console.log(this.admin)
      })
    }
    else if (roles.includes('Employee')){
      this.service.GetEmployee(userID).subscribe(result=>{
        this.profile = result as Employee;
        console.log(this.employee)
      })
    }
  }

  Logout() {
    this.AuthService.Logout();   
  }  

  ChangePassword(){
    let newpassword = new ChangePasswordVM()
    //change password form

    this.AuthService.ChangeUserPassword(newpassword).subscribe(result =>{
      if(result.status == "Success"){
        //change status success popup
      }
      else{
        //error alert
      }
    })
  }

  //=========== edits ===========
  isModalOpen = false;
  editadmin: Admin = new Admin();

  editForm: FormGroup = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    surname: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    cell_Number: new FormControl(''),
    username: new FormControl('',[Validators.required])
  })

  EditAdmin(admin_ID:string, isOpen: boolean)
  {    
    this.service.GetAdminDetails(admin_ID).subscribe(response => {         
      this.editadmin = response as Admin;

      this.editForm.controls['firstName'].setValue(this.editadmin.firstName);
      this.editForm.controls['surname'].setValue(this.editadmin.surname);
      this.editForm.controls['email'].setValue(this.editadmin.email);
      this.editForm.controls['cell_Number'].setValue(this.editadmin.cell_Number);
      this.editForm.controls['username'].setValue(this.editadmin.username);
    })
    
    this.isModalOpen = isOpen;
  }

  confirmeditmodal(){
    try
    {
      let editedAdmin = new Admin();
      editedAdmin.firstName = this.editForm.value.firstName;
      editedAdmin.surname = this.editForm.value.surname;
      editedAdmin.email = this.editForm.value.email;
      editedAdmin.cell_Number = this.editForm.value.cell_Number;
      editedAdmin.username = this.editForm.value.username;

      this.service.UpdateAdmin(this.editadmin.admin_ID, editedAdmin).subscribe(result =>{
        this.editSuccessAlert();
      })
    }
    catch{      
      this.editErrorAlert();
    }    
  }

  canceleditmodal() {
    this.isModalOpen = false;
  }

  async editSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Your account has been updated',
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
      subHeader: 'Account was not updated',
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

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  reloadPage(){
    window.location.reload()
  }

  public Help() {
    this.router.navigate(["/admin-help"])
  }

}
