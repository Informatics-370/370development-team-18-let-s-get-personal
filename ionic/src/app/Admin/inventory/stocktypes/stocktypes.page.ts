import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StockTypes } from 'src/app/Models/stocktypes';
import { StockTypeDataService } from 'src/app/Services/stocktype.service';
import { FormsModule, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

//for modal
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-stocktypes',
  templateUrl: './stocktypes.page.html',
  styleUrls: ['./stocktypes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class StocktypesPage implements OnInit {
 @ViewChild(IonModal) modal!: IonModal
  stocktypes: StockTypes[] =[];
  constructor(public modalCtrl: ModalController, private service:StockTypeDataService,
    private thisroute: Router, private currentroute: ActivatedRoute, private alertController: AlertController) { }

 
    ngOnInit() {
  }

  public test(){
    console.log("test");
    this.service.GetStockTypes().subscribe((data) => {
      console.log(data);
      this.stocktypes = data;
    });
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

  async confirmaddmodal() {
    const alert = await this.alertController.create({
      header: 'Please Confirm that you would like to continue',
      buttons: ['Cancel', 'Continue']
    });
    await alert.present();
    this.modal.dismiss('confirm');
  }

  canceleditmodal() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirmeditmodal() {
    const alert = await this.alertController.create({
      header: 'Please Confirm that you would like to continue',
      buttons: ['Cancel', 'Continue']
    });
    await alert.present();
    this.modal.dismiss('confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

}
