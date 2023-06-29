import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-waterbottles',
  templateUrl: './waterbottles.page.html',
  styleUrls: ['./waterbottles.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class WaterbottlesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
