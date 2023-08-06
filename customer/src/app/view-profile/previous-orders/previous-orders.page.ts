import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController,AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.page.html',
  styleUrls: ['./previous-orders.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreviousOrdersPage implements OnInit {

  constructor(private _modalController: ModalController, private _router: Router, private alertController:AlertController) { }


  ngOnInit() {
  }
  public ProductRating() {
    this._router.navigate(["/tabs/product-rating"])
  }
}
