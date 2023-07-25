import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ProfileService } from 'src/app/Services/profile.service';
import { Experience_Rating } from 'src/app/Models/experiencerating';
import { Experience_RatingService } from 'src/app/Services/experiencerating.service';
//for modal
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ProfilePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal
  data = {profileId: 0, email: '', password: '', cellnumber: '', Firstname: '', Lastname: '', adress:''};
  experienceRatings: Experience_Rating[] =[]

  constructor(public experienceRatingservice:Experience_RatingService, public modalCtrl: ModalController, 
    private router: Router, private service:ProfileService, private alertController:AlertController, private thisroute: Router) { }

  ngOnInit() {
  
  }

  AddForm: FormGroup = new FormGroup({
    ExperienceStarRating: new FormControl('',[Validators.required]),
    ExperienceRatingComments: new FormControl('',[Validators.required])
  })

  logout(){
    // if(this.ConfirmLogOut() == 'Continue'){

    // }
    
  }
 
  getProfile(){

   }

   getExRatings(){
    this.experienceRatingservice.GetAllExperienceRatings().subscribe(result =>{
      this.experienceRatings = result as Experience_Rating[];
    })
  }

   EditExRating(Experience_Rating_ID:Number){
    this.thisroute.navigate(['/edit-discounts', Experience_Rating_ID]);
  }
  
  DeleteExRating(Experience_Rating_ID:Number){
    this.experienceRatingservice.DeleteExperienceRating(Experience_Rating_ID).subscribe(result => {
      console.log(result);
      if(result == null)
      {
        this.DeleteRatingErrorAlert();
      }
      else{
        this.DeleteRatingSuccessAlert();
      }
    })
  }

  AddExperienceRating(){
    let addExRating = new Experience_Rating();

    addExRating.Experience_Star_Rating = this.AddForm.value.ExperienceStarRating;
    addExRating.Experience_Rating_Comments = this.AddForm.value.ExperienceRatingComments;

    this.experienceRatingservice.AddExperienceRating(addExRating).subscribe((response:any) => {
      if(response == null)
      {
        this.addExperienceRatingErrorAlert();
      }
      else{
        this.addExperienceRatingSuccessAlert();
      }
    })
  }

  canceladdmodal() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmaddmodal() {
    this.AddExperienceRating();    
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  async addExperienceRatingSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Rating Added',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async addExperienceRatingErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Rating Was Not Added',
      message: 'Please try again',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async DeleteRatingSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Experience Rating Deleted',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async DeleteRatingErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Experience Rating Was Not Deleted',
      message: 'Please try again',
      buttons: ['OK', 'Cancel'],
    });
    await alert.present();
    //this.modal.dismiss('Cancel');
  }

  async ConfirmLogOut() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to log out?',
      buttons: ['Logout', 'Cancel'],
    });
    await alert.present();
    this.modal.dismiss('Cancel');
  }
  async LogoutSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'You are logged out',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async LogoutFailedAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Logout was not successful please try again',
      message: 'Please try again',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
