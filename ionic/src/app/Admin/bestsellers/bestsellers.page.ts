import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Stock_Item } from 'src/app/Models/stockitem';
import { HttpClient } from '@angular/common/http';
import { BestsellersService } from 'src/app/Services/bestsellers.service';

@Component({
  selector: 'app-bestsellers',
  templateUrl: './bestsellers.page.html',
  styleUrls: ['./bestsellers.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BestsellersPage implements OnInit {

  stockItems: Stock_Item[] = [];
  selectedProducts: Stock_Item[] = [];

  constructor(private http: HttpClient, private service: BestsellersService) { }

  ngOnInit() {
    this.service.GetStockItems().subscribe((result: any) => {
      console.log(result);
      this.stockItems = result;
      this.stockItems.forEach(item => {item.isSelected = false});
    });
  }

  saveBestSellers() {
    this.selectedProducts = this.stockItems.filter((item) => item.isSelected);
    this.service.SaveBestSellersList(this.selectedProducts).subscribe((result: any) => {
      console.log('Best Sellers list saved successfully:', result);
    });
  }
}
