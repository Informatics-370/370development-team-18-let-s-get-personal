import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-glasses',
  templateUrl: './glasses.page.html',
  styleUrls: ['./glasses.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class GlassesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
