import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-edit-stock-types',
  templateUrl: './edit-stock-types.page.html',
  styleUrls: ['./edit-stock-types.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EditStockTypesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
