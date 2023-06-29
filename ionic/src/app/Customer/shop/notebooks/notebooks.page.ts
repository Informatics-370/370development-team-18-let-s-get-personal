import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-notebooks',
  templateUrl: './notebooks.page.html',
  styleUrls: ['./notebooks.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class NotebooksPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
