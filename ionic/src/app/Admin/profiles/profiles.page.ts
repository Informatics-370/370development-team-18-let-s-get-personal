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


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.page.html',
  styleUrls: ['./profiles.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilesPage implements OnInit {
  Profile:ProfilesPage[] = []

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

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  async confirmaddmodal() {
    const alert = await this.alertController.create({
      header: 'Please Confirm that you would like to submit this profile',
      buttons: ['Cancel', 'Continue']
    });
    await alert.present();
   
  }



}

