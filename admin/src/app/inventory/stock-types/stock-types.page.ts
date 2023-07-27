import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-stock-types',
  templateUrl: './stock-types.page.html',
  styleUrls: ['./stock-types.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class StockTypesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
