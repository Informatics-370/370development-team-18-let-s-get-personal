import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-stock-take',
  templateUrl: './stock-take.page.html',
  styleUrls: ['./stock-take.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class StockTakePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
