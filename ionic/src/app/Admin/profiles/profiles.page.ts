import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from 'src/app/Services/profile.service';
import { IonicModule, AlertController, ModalController, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { elementAt, isEmpty } from 'rxjs';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { User } from 'src/app/Models/user';
import { Customer } from 'src/app/Models/customer';
import { Employee } from 'src/app/Models/employee';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.page.html',
  styleUrls: ['./profiles.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilesPage implements OnInit {
  
  users: User[] = []
  @ViewChild(IonModal) modal!: IonModal

  filterTerm: string = "";
  filteredItems:  User[] = [];
  
  constructor(private profileService:ProfileService, 
    private alertController:AlertController, 
    private empservice: EmployeeService, 
    public modalCtrl: ModalController) { }

  ngOnInit() {
    this.profileService.GetAllUsers().subscribe(res => {
      this.users = res;
    })
  }

  deleteUser(user: User) {
    var userID = user.User_ID;
    this.profileService.DeleteUser(userID.toString()).subscribe(res => {
      this.profileService.GetAllUsers().subscribe(res => {
        this.users = res;
        this.presentAlert(`Deleting user: ${user.Email}`);
      })
    })
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Admin Action',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}

