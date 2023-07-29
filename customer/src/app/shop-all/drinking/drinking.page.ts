import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drinking',
  templateUrl: './drinking.page.html',
  styleUrls: ['./drinking.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DrinkingPage implements OnInit {

  constructor(private _modalController:ModalController,private _router:Router) { }

  ngOnInit() {
  }
  public clothing(){
    this._router.navigate(["/tabs/clothing"])
  }
  public shopall(){
    this._router.navigate(["/tabs/shop-all"])
  }
  public stationary(){
    this._router.navigate(["/tabs/stationary"])
  }
  public Basket() {
    this._router.navigate(["/tabs/basket"])
  }
}
