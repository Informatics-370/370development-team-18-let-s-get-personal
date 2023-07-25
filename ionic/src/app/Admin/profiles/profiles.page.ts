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
  
  Profile: User[] = []
  @ViewChild(IonModal) modal!: IonModal

  filterTerm: string = "";
  filteredItems:  User[] = [];
  
  constructor(private service:ProfileService, private alertController:AlertController, 
    private empservice: EmployeeService, public modalCtrl: ModalController) { }

  ngOnInit() {
  
  } 



  


}

