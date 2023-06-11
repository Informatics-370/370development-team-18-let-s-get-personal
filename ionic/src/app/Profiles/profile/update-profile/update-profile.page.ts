import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonModal, IonicModule, ModalController } from '@ionic/angular';
import { FormsModule, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ProfileService } from 'src/app/Services/profile.service';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class UpdateProfilePage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal
  data = {profileId: 0, email: '', password: '', cellnumber: '', Firstname: '', Lastname: '',adress:''};

  constructor(public modalCtrl: ModalController,private router: Router, private service:ProfileService) { }


  ngOnInit() {
  }

  UpdateProfile(){

  }
  
  cancelmodal() {
    this.modal.dismiss(null, 'cancel');
  }

   confirmodal() {
  
  }
  
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

}
