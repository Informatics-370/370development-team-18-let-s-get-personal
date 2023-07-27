import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.page.html',
  styleUrls: ['./edit-company.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EditCompanyPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
