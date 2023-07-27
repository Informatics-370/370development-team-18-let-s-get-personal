import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-shop-all',
  templateUrl: './shop-all.page.html',
  styleUrls: ['./shop-all.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ShopAllPage implements OnInit {
  menuType: string = 'overlay';
  constructor() { }

  ngOnInit() {
  }

}
