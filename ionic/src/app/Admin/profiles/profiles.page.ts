import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfileService } from 'src/app/Services/profile.service';
import { AlertController } from '@ionic/angular';
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { elementAt } from 'rxjs';
import { User } from 'src/app/Models/user';
import { Customer } from 'src/app/Models/customer';
import { Employee } from 'src/app/Models/employee';
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.page.html',
  styleUrls: ['./profiles.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilesPage implements OnInit {
  
  Profile:User[] = []
  customers: Customer[] = []
  employees: Employee[] = []
  constructor(private service:ProfileService, private alertController:AlertController) { }

  ngOnInit() {
    this.getProfle()
  }

  getProfle(){
    this.service.GetProfile().subscribe(result => {
      let profilelist:any[] = result
      profilelist.forEach((element) => {
        this.Profile.push(element)
      });
    })
  }
  AddUser(){

  }
  
  DeleteEmployee(){

  }

  DeleteCustomer(){

  }
}

