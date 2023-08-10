import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-edit-personalization',
  templateUrl: './edit-personalization.page.html',
  styleUrls: ['./edit-personalization.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EditPersonalizationPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
