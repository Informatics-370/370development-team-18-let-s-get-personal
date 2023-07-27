import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-stationary',
  templateUrl: './stationary.page.html',
  styleUrls: ['./stationary.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class StationaryPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
