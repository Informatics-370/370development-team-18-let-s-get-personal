import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-personalisation',
  templateUrl: './personalisation.page.html',
  styleUrls: ['./personalisation.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PersonalisationPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
