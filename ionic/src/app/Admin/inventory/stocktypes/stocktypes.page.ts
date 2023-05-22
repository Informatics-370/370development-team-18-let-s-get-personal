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
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [StockTypeDataService]
})
export class StocktypesPage implements OnInit {
 @ViewChild(IonModal) modal!: IonModal
  stocktypes: StockTypes[] =[];
  stocktype: any
  constructor(public modalCtrl: ModalController, private service:StockTypeDataService,
    private router: Router,  private alertController: AlertController) { }
    AddTypeForm:FormGroup = new FormGroup({
      name: new FormControl(['',Validators.required])      
    });
  
    EditTypeForm:FormGroup = new FormGroup({
      name: new FormControl(['',Validators.required])
    });
 
  ngOnInit(): void {
   
  }

  GetStockTypes(){
   
  }

  addStockTypes(){
      this.service.AddStockType(this.AddTypeForm.value).subscribe(result => {
          this.router.navigate(['/inventory'])
    })
  }

  getstocktype(stock_Type_ID:Number){
   
  }

  StockTypeToEdit!: StockTypes;
  updateStockTypes(stock_Type_ID:Number){
   
  }

  deleteStockTypes(stock_Type_ID:Number){
   
  }

  reloadPage(){
    window.location.reload()
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
