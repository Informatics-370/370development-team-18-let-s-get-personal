import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Experience_Rating } from 'src/app/Models/experiencerating';
import { Experience_RatingService } from 'src/app/Services/experiencerating.service';

@Component({
  selector: 'app-update-experienc-rating',
  templateUrl: './update-experienc-rating.page.html',
  styleUrls: ['./update-experienc-rating.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class UpdateExperiencRatingPage implements OnInit {

  constructor(private service:Experience_RatingService, private thisroute: Router, private currentroute: ActivatedRoute,
    private alertController:AlertController) { }

    EditForm: FormGroup = new FormGroup({
      ExperienceStarRating: new FormControl('',[Validators.required]),
      ExperienceRatingComments: new FormControl('',[Validators.required])
    })

    experienceRatingToEdit: any

    ngOnInit(): void {
      this.service.GetExperienceRating(+this.currentroute.snapshot.params['id']).subscribe(result =>{
        this.experienceRatingToEdit = result
        this.EditForm.patchValue({
          ExperienceStarRating: this.experienceRatingToEdit.Experience_Star_Rating,
          ExperienceRatingComments: this.experienceRatingToEdit.Experience_Rating_Comments
        });
      })
    }
    onSubmit(){
      let editedRating = new Experience_Rating();
      editedRating.Experience_Star_Rating = this.EditForm.value.ExperienceStarRating;
      editedRating.Experience_Rating_Comments = this.EditForm.value.ExperienceRatingComments;
  
      this.service.UpdateExperienceRating(this.experienceRatingToEdit.Experience_Rating_ID, editedRating).subscribe(result =>{
        if(result == null)
        {
          this.editExperienceRatingErrorAlert();
        }
        else{
          this.editExperienceRatingSuccessAlert();
        }
      })
    }
    async editExperienceRatingSuccessAlert() {
      const alert = await this.alertController.create({
        header: 'Success!',
        subHeader: 'Experience Rating Updated',
        buttons: ['OK'],
      });
      await alert.present();
    }
  
    async editExperienceRatingErrorAlert() {
      const alert = await this.alertController.create({
        header: 'We are sorry!',
        subHeader: 'Experience Rating Was Not Updated',
        message: 'Please try again',
        buttons: ['OK'],
      });
      await alert.present();
    }

}
