import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-drinking',
  templateUrl: './drinking.page.html',
  styleUrls: ['./drinking.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DrinkingPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
