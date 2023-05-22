import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-refunds',
  templateUrl: './refunds.page.html',
  styleUrls: ['./refunds.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RefundsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
