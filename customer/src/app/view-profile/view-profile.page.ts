import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController,AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserProfileDataService } from '../Services/userprofile.service';
import { Customer } from '../Models/customer';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewProfilePage implements OnInit {
  customer: Customer = new Customer()

  constructor(private _modalController: ModalController, private _router: Router, 
    private alertController:AlertController, private service: UserProfileDataService) { }
  public username: string = ""

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

  public updateProfile() {
    
  }
  public deleteProfile() {
    //this._router.navigate(["/tabs/"])
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
    this._router.navigate(["/tabs/login"])
    // this.currentUser.next(false);
    // this.router.navigateByUrl('/login', {replaceUrl: true});
  }
}
