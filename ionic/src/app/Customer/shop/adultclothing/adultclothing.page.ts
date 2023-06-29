import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-adultclothing',
  templateUrl: './adultclothing.page.html',
  styleUrls: ['./adultclothing.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AdultclothingPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
