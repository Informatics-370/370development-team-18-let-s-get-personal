import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StockItemColours } from 'src/app/Models/stockitemcolour';
import { StockItemColourDataService } from 'src/app/Services/stockitemcolours.service';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//for modal
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-stockitemcolours',
  templateUrl: './stockitemcolours.page.html',
  styleUrls: ['./stockitemcolours.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class StockitemcoloursPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal
  stockitemcolours: StockItemColours[] = [];
  AddColourForm!: FormGroup
  EditColourForm!: FormGroup
  constructor(public modalCtrl: ModalController, private toast: ToastController, private formBuilder: FormBuilder, private service:StockItemColourDataService) { 
    this.AddColourForm = this.formBuilder.group({
      name: ['',Validators.required],
      image: ['',Validators.required]
    });

    this.AddColourForm = this.formBuilder.group({
      name: ['',Validators.required],
      image: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.GetStockItemColours()

  }

  GetStockItemColours(){
    this.service.GetStockItemColours().subscribe(result =>{
      this.stockitemcolours = result as StockItemColours[];
    })
  }

  addcolour(){

  }

  updatecolour(StockItemColorId:Number){

  }

  deletecolour(StockItemColorId:Number){

  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
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
}
