import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-stockitemcolours',
  templateUrl: './stockitemcolours.page.html',
  styleUrls: ['./stockitemcolours.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class StockitemcoloursPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
