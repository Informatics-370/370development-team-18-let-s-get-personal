import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController,AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewProfilePage implements OnInit {

  constructor(private _modalController: ModalController, private _router: Router, private alertController:AlertController) { }


  ngOnInit() {
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
