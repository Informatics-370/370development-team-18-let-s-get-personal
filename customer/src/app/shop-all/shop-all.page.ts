import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-all',
  templateUrl: './shop-all.page.html',
  styleUrls: ['./shop-all.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ShopAllPage implements OnInit {
  menuType: string = 'overlay';
  constructor(private _modalController:ModalController,private _router:Router) { }

  ngOnInit() {
  }
public clothing(){
  this._router.navigate(["/tabs/clothing"])
}
public drinking(){
  this._router.navigate(["/tabs/drinking"])
}
public stationary(){
  this._router.navigate(["/tabs/stationary"])
}
}
