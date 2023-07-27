import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-edit-stock-item-colours',
  templateUrl: './edit-stock-item-colours.page.html',
  styleUrls: ['./edit-stock-item-colours.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EditStockItemColoursPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
