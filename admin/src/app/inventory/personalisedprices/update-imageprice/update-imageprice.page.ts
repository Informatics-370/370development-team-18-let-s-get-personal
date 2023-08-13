import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-update-imageprice',
  templateUrl: './update-imageprice.page.html',
  styleUrls: ['./update-imageprice.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UpdateImagepricePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
