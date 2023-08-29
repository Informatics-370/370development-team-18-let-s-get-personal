import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController, AlertController } from '@ionic/angular';
import { Router, RouterModule,ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Experience_Rating } from 'src/app/Models/experiencerating';
import { Experience_RatingService } from 'src/app/Services/experiencerating.service';
//for modal

import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

enum COLORS {
  GREY = "E0E0E0",
  GREEN = "#76FF03",
  YELLOW = "#FFCA28",
  RED = "#DD2C00"
}
@Component({
  selector: 'app-experience-rating',
  templateUrl: './experience-rating.page.html',
  styleUrls: ['./experience-rating.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class ExperienceRatingPage implements OnInit {

  @Input() rating!: number;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter(); 
  AddForm: any;
  formData = new FormData();
  expRatings: Experience_Rating[] = [];
  @ViewChild(IonModal) modal!: IonModal;

  constructor(private _modalController: ModalController, private _router: Router, private alertController: AlertController,
    private service: Experience_RatingService,private route:ActivatedRoute) { }

    AddExpRatingForm:FormGroup = new FormGroup({
      ExpRating: new FormControl('',[Validators.required]),     
      comment: new FormControl('',[Validators.required]), 
    }); 

  ngOnInit():void {
    this.GetExpRatings();
  }

  GetExpRatings(){
this.service.GetAllExperienceRatings().subscribe(result =>{
  this.expRatings = result as Experience_Rating[];
  console.log(this.expRatings);
})  
  }


  rate(index: number) {
    this.rating = index;
    this.ratingChange.emit(this.rating);
    console.log(this.rating);
  }

  getColor(index: number) {
    if (this.isAboveRating(index)) {
      return COLORS.GREY;
    }
    switch (this.rating) {
      case 1:
      case 2:
        return COLORS.RED;
        case3:
        return COLORS.YELLOW;
      case 4:
      case 5:
        return COLORS.GREEN;
      default:
        return COLORS.GREY;
    }
  }

  isAboveRating(index: number): boolean {
    return index > this.rating;
    console.log(index);
  }

  public updateExpRating(experience_Rating_ID:string) {
    this._router.navigate(["/tabs/edit-product-rating"])
  }

  /*AddExperienceRating() {
    this.formData.append('rating',this.AddExpRatingForm.get('rating')!.value);
    this.formData.append('comment',this.AddExpRatingForm.get('comment')!.value);
    this.service.AddExperienceRating(this.formData).subscribe(result => {
      if(result.status == "Error"){        
        this.addExpRatingErrorAlert();
      }
      else if(result.status == "Success"){
        this.addExpRatingSuccessAlert()
      }
    })
  }*/
  AddExperienceRating() {
    try{
      let AddExpRating = new Experience_Rating();
    AddExpRating.experience_Star_Rating = this.AddForm.value.prodRating;
    AddExpRating.experience_Rating_Comments = this.AddForm.value.comment;

    this.service.AddExperienceRating(AddExpRating).subscribe(response => {
      if (response.status == "Error") {
        
      }
      else {
        this.addExpRatingSuccessAlert();
      }
    })
    }
    catch{
this.addExpRatingErrorAlert();
    }
    
  }

  DeleteExperienceRating(experience_Rating_ID: string) {
    // this.service.DeleteExperienceRating(experience_Rating_ID).subscribe(result => {
    //   console.log(result);
    //   if (result.status == "Error") {
    //     this.DeleteExpRatingErrorAlert();
    //   }
    //   else if (result.status == "Success") {
    //     this.DeleteExpRatingSuccessAlert();
    //   }
    // })
  }

  reloadPage() {
    window.location.reload()
  }

  canceladdmodal() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmaddmodal() {
    this.AddExperienceRating();
    console.log(this.rating);
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  async addExpRatingSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Your experience rating was captured.',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          this.reloadPage();
        }
      }],
    });
    await alert.present();
  }
  async addExpRatingErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Your experience rating was not captured.',
      message: 'Please try again',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          this.reloadPage();
        }
      }],
    });
    await alert.present();
  }



  async DeleteExpRatingSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Your experience rating is successfully deleted!',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          this.reloadPage();
        }
      }],
    });
    await alert.present();
  }

  async DeleteExpRatingErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Your Experience Rating Was Unfortunately Not Deleted.',
      message: 'Please try again',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          this.reloadPage();
        }
      }],
    });
    await alert.present();
  }


}


