import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-stock-item-colours',
  templateUrl: './stock-item-colours.page.html',
  styleUrls: ['./stock-item-colours.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class StockItemColoursPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
