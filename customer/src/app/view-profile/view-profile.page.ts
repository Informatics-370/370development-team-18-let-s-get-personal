import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController,AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserProfileDataService } from '../Services/userprofile.service';
import { Customer } from '../Models/customer';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
  constructor(private _modalController: ModalController, private _router: Router, 
    private alertController:AlertController, private service: UserProfileDataService, public modalCtrl: ModalController) 
  { }
  

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

  //========== edit =====

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

  public deleteProfile(customer_ID: string) {
    try{
      this.service.DeleteCustomer(customer_ID).subscribe(result =>{
        console.log(result);
      })
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
  public ChangePassword() {
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
    //this.reloadPage();
    this._router.navigate(["/tabs/login"])
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
