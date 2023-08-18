import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-order-requests',
  templateUrl: './order-requests.page.html',
  styleUrls: ['./order-requests.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OrderRequestsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
