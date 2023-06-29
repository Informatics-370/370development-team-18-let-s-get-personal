import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-mugs',
  templateUrl: './mugs.page.html',
  styleUrls: ['./mugs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MugsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
