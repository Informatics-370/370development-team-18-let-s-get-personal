import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-best-sellers',
  templateUrl: './best-sellers.page.html',
  styleUrls: ['./best-sellers.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BestSellersPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
