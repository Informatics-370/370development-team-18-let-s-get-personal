import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-experience-rating',
  templateUrl: './experience-rating.page.html',
  styleUrls: ['./experience-rating.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ExperienceRatingPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
