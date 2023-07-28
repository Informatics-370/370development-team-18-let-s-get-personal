import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clothing',
  templateUrl: './clothing.page.html',
  styleUrls: ['./clothing.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ClothingPage implements OnInit {

  constructor(private _modalController:ModalController,private _router:Router) { }

  ngOnInit() {
  }
  public shopall(){
    this._router.navigate(["/tabs/shop-all"])
  }
  public drinking(){
    this._router.navigate(["/tabs/drinking"])
  }
  public stationary(){
    this._router.navigate(["/tabs/stationary"])
  }
}
