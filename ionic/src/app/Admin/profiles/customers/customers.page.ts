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
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CustomersPage implements OnInit {
  Profile: User[] = []
  customers: Customer[] = []
  employees: Employee[] = []
  employee: any
  @ViewChild(IonModal) modal!: IonModal
  
  constructor(private service:ProfileService, private alertController:AlertController, 
    private empservice: EmployeeService, public modalCtrl: ModalController) { }

  

  ngOnInit() {
  }

}
