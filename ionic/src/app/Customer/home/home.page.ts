import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Best_Sellers } from 'src/app/Models/bestsellers';
import { BestsellersService } from 'src/app/Services/bestsellers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  bestSellers!: Best_Sellers[];

  constructor(public bsdataservice: BestsellersService) { }

  ngOnInit() {
    this.GetBestSellers()
  }

  addExperienceRating(){
    
  }
  GetBestSellers(){
    this.bsdataservice.GetBestSellers().subscribe(result =>{
      this.bestSellers = result as Best_Sellers[];
    })
  }


}
