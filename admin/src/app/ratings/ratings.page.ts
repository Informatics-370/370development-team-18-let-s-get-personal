import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductRatingDataService } from '../Services/productrating.service';
import { ProductRatingVM } from '../ViewModels/productratingVM';
import { Experience_RatingService } from '../Services/experiencerating.service';
import { ExperienceRatingVM } from '../ViewModels/experienceratingVM';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.page.html',
  styleUrls: ['./ratings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RatingsPage implements OnInit {
  productratings: ProductRatingVM[] = []
  experienceratings: ExperienceRatingVM[] = []
  constructor(private service: ProductRatingDataService, private eservice: Experience_RatingService,
    private route: Router) { }

  ngOnInit() {
    this.getExperienceRatings()
    this.getProductRatings()
  }

  getExperienceRatings(){
    this.eservice.GetAllExperienceRatings().subscribe(result => {
      this.experienceratings = result as ExperienceRatingVM[]
    })
  }

  getProductRatings(){
    this.service.GetProductRatings().subscribe(result => {
      this.productratings = result as ProductRatingVM[]
    })
  }


}
