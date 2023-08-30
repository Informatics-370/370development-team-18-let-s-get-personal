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
  customer: Customer[] =[]

  constructor(private _modalController: ModalController, private _router: Router, 
    private alertController:AlertController, private service: UserProfileDataService) { }
  public username: string = ""

  ngOnInit() {
    this.getUser()
  }

  getUser()
  {
    this.username = JSON.parse(JSON.stringify(localStorage.getItem('username')));

    let customerID = JSON.parse(JSON.stringify(localStorage.getItem('customerID')));

    this.service.GetCustomer(customerID).subscribe(result => {
      this.customer = result as Customer[];
    })

  }

  public updateProfile() {
    this._router.navigate(["/tabs/update-profile"])
  }
  public deleteProfile() {
    this._router.navigate(["/tabs/"])
  }
  
  public PreviousOrders() {
    this._router.navigate(["/tabs/previous-orders"])
  }
  public ExpRating() {
    this._router.navigate(["/tabs/experience-rating"])
  }
}
