import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Best_Sellers } from 'src/app/Models/bestsellers';
import { BestSellerDataService } from 'src/app/Services/bestsellers.service';

@Component({
  selector: 'app-best-sellers',
  templateUrl: './best-sellers.page.html',
  styleUrls: ['./best-sellers.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BestSellersPage implements OnInit {
  bestSellers!: Best_Sellers[];
  constructor(public bsdataservice: BestSellerDataService) { }

  ngOnInit() {
    this.GetBestSellers()
  }

  GetBestSellers(){
    this.bsdataservice.GetBestSellers().subscribe(result =>{
      this.bestSellers = result as Best_Sellers[];
    })
  }

  RemoveBestSeller(Best_Seller_Id: number){
      // this.bsdataservice.(Best_Seller_Id).subscribe(result =>{
      //  window.location.reload();
      // });
  }

}
