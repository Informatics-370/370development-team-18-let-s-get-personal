import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StockItemColours } from 'src/app/Models/stockitemcolour';
import { HttpClient } from '@angular/common/http';
import { PersonalisationService } from 'src/app/Services/personalisation.service';

@Component({
  selector: 'app-personalisation',
  templateUrl: './personalisation.page.html',
  styleUrls: ['./personalisation.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PersonalisationPage {
  selectedItemColor: string = '';
  stockItemColors: StockItemColours[] = []; 
  textMessage: string = '';
  textPosition: string = '';
  selectedTextColor: string = '';

  constructor(private httpClient: HttpClient, private service: PersonalisationService) { }

  ionViewWillEnter() {
    this.getStockItemColours();
  }

  getStockItemColours() {
    this.service.GetStockItemColours().subscribe((result) => {
      this.stockItemColors = result;
    });
  }

  onImageChange(event: any) {
    // Handle image upload here (e.g., store the image in a variable or process it further)
    // The event object contains the uploaded file details
  }

  savePersonalization() {
    this.service.AddPersonalisation({
      itemColor: this.selectedItemColor,
      textMessage: this.textMessage,
      textPosition: this.textPosition,
      textColor: this.selectedTextColor,
    }).subscribe(
      (response) => {
        console.log('Personalization saved successfully:', response);
      },
      (error) => {
        console.error('Error saving personalization:', error);
      })
  }

  deletePersonalization() {
    this.service.DeletePersonalisation(1).subscribe(
      (response) => {
        console.log('Personalization deleted successfully:', response);
      },
      (error) => {
        console.error('Error deleting personalization:', error);
      })
  }
  
}
