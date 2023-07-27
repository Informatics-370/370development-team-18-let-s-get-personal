import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-write-off',
  templateUrl: './write-off.page.html',
  styleUrls: ['./write-off.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class WriteOffPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
