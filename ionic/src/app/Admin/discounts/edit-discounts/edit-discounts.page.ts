import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Discount } from 'src/app/Models/discount';
import { DiscountService } from 'src/app/Services/discount.service';


@Component({
  selector: 'app-edit-discounts',
  templateUrl: './edit-discounts.page.html',
  styleUrls: ['./edit-discounts.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class EditDiscountsPage implements OnInit {

  constructor(private service:DiscountService, private thisroute: Router) { }

  ngOnInit(): void {

  }

}
