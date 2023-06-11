import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/Services/profile.service';


@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.page.html',
  styleUrls: ['./create-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class CreateProfilePage implements OnInit {
  
  data = {profileId: 0, email: '', password: '', cellnumber: '', Firstname: '', Lastname: '',adress:''};

  constructor(private service:ProfileService) { }

  ngOnInit() {
  }

  AddProfile(){

  }

}
