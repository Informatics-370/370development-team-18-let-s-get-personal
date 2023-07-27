import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-delivery-companies',
  templateUrl: './delivery-companies.page.html',
  styleUrls: ['./delivery-companies.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DeliveryCompaniesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
