import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-edit-product-rating',
  templateUrl: './edit-product-rating.page.html',
  styleUrls: ['./edit-product-rating.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EditProductRatingPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
