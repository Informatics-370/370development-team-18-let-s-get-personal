import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController,AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-rating',
  templateUrl: './product-rating.page.html',
  styleUrls: ['./product-rating.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProductRatingPage implements OnInit {

  constructor(private _modalController: ModalController, private _router: Router, private alertController:AlertController) { }


  ngOnInit() {
  }
  public updateProdRating() {
    this._router.navigate(["/tabs/edit-product-rating"])
  }
  public deleteProdRating() {
    this._router.navigate(["/tabs/"])
  }
}
