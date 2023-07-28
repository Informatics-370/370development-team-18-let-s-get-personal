import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stationary',
  templateUrl: './stationary.page.html',
  styleUrls: ['./stationary.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class StationaryPage implements OnInit {

  constructor(private _modalController:ModalController,private _router:Router) { }

  ngOnInit() {
  }
  public clothing(){
    this._router.navigate(["/tabs/clothing"])
  }
  public drinking(){
    this._router.navigate(["/tabs/drinking"])
  }
  public shopall(){
    this._router.navigate(["/tabs/shop-all"])
  }
}
