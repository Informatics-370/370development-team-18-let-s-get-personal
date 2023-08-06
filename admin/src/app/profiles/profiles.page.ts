import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController, ModalController, IonModal } from '@ionic/angular';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { User } from 'src/app/Models/user';
import { Customer } from 'src/app/Models/customer';
import { Employee } from 'src/app/Models/employee';
import { UserProfileDataService } from '../Services/userprofile.service';
import { Admin } from '../Models/admin';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.page.html',
  styleUrls: ['./profiles.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilesPage implements OnInit {
  Profile: User[] = []
  admin: Admin [] = []
  customers: Customer[] = []
  employees: Employee[] = []
  employee: any
  @ViewChild(IonModal) modal!: IonModal

  constructor( private alertController:AlertController, private service: UserProfileDataService, 
    public modalCtrl: ModalController) { } 

  ngOnInit() {
  }

  GetAdmins(){

  }

  GetEmployees(){

  }

  GetCustomers(){

  }

  // getAllRefundPolicies(){
  //   this.service.GetAllRefundPolicies().subscribe(result =>{
  //     this.refundPolicies = result as Refund_Policy[];
  //     console.log(this.refundPolicies);
  //   })
  // }
}
