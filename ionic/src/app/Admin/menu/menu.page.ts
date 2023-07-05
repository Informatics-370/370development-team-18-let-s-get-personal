import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { Experience_Rating } from 'src/app/Models/experiencerating';
import { Experience_RatingService } from 'src/app/Services/experiencerating.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MenuPage implements OnInit {

  constructor(private service:Experience_RatingService, private thisroute: Router, private alertController:AlertController) { }
  experienceRatings: Experience_Rating[] =[]
  ngOnInit() {
    this.getExRatings();
  }

  getExRatings(){
    this.service.GetAllExperienceRatings().subscribe(result =>{
      this.experienceRatings = result as Experience_Rating[];
    })
  }


  
  

}
