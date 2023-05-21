import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StockTypes } from 'src/app/Models/stocktypes';
import { StockTypeDataService } from 'src/app/Services/stocktype.service';

//for modal
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-stocktypes',
  templateUrl: './stocktypes.page.html',
  styleUrls: ['./stocktypes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class StocktypesPage implements OnInit {
 @ViewChild(IonModal) modal!: IonModal
  stocktypes: StockTypes[] =[];
  constructor(public modalCtrl: ModalController) { }

 
    ngOnInit() {
  }
  GetStockTypes(){
    
  }

  addStockTypes(){

  }

  updateStockTypes(StockTypeId:Number){

  }

  deleteStockTypes(StockTypeId:Number){

  }
 
  canceladdmodal() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmaddmodal() {
    this.modal.dismiss('confirm');
  }

  canceleditmodal() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmeditmodal() {
    this.modal.dismiss('confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

}
