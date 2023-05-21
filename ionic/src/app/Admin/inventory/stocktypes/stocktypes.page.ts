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
  stocktype: any
  constructor(public modalCtrl: ModalController, private service:StockTypeDataService,
    private thisroute: Router, private currentroute: ActivatedRoute, private alertController: AlertController) { }
    AddTypeForm:FormGroup = new FormGroup({
      name: new FormControl(['',Validators.required])      
    });
  
    EditTypeForm:FormGroup = new FormGroup({
      name: new FormControl(['',Validators.required])
    });
 
  ngOnInit(): void {
    this.GetStockTypes()

    this.currentroute.params.subscribe(params =>{
      this.service.GetStockType(params['id']).subscribe(result =>{
        this.StockTypeToEdit = result as StockTypes;

        this.EditTypeForm.controls['name'].setValue(this.StockTypeToEdit.StockTypeName);

      })
    })
  }

  GetStockTypes(){
    this.service.GetStockTypes().subscribe(result =>{
      this.stocktypes = result as StockTypes[];
    })
  }

  addStockTypes(){
    let addedcolour = new StockTypes();

    this.service.AddStockType(addedcolour).subscribe((response: any) =>{
      if(response.statusCode == 200){
        this.thisroute.navigate(['./stocktypes'])
      }
      else{
        alert(response.message);
      }
    });
  }

  getstocktype(StockTypeId:Number){
    this.service.GetStockType(StockTypeId).subscribe(result =>{
      this.stocktypes = result as StockTypes[];
    })
  }

  StockTypeToEdit!: StockTypes;
  updateStockTypes(StockTypeId:Number){
   this.currentroute.params.subscribe(params =>{
      this.service.GetStockType(params['StockItemColorId']).subscribe(result =>{
        this.StockTypeToEdit = result as StockTypes;
        this.EditTypeForm.controls['name'].setValue(this.StockTypeToEdit.StockTypeName);
        

        if(this.EditTypeForm.valid == true){
          this.service.UpdateStockType(StockTypeId, this.EditTypeForm.value).subscribe((res: any) =>{
            console.log(result);
            this.canceleditmodal();
          })
        }
      })
    })
  }

  deleteStockTypes(StockTypeId:Number){
    this.service.DeleteStockType(StockTypeId).subscribe(result =>{
      console.log(result)
    })
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
