import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StockItemColours } from 'src/app/Models/stockitemcolour';
import { StockItemColourDataService } from 'src/app/Services/stockitemcolours.service';
import { ToastController } from '@ionic/angular';
import { FormsModule, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';


//for modal
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-stockitemcolours',
  templateUrl: './stockitemcolours.page.html',
  styleUrls: ['./stockitemcolours.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})

export class StockitemcoloursPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal
  stockitemcolours: StockItemColours[] = [];
  colour: any;
  

  constructor(public modalCtrl: ModalController, private toast: ToastController, 
    private service:StockItemColourDataService,
    private thisroute: Router, private currentroute: ActivatedRoute, private alertController: AlertController) {  }

  AddColourForm:FormGroup = new FormGroup({
    name: new FormControl(['',Validators.required]),
    image: new FormControl(['',Validators.required])
  });

  EditColourForm:FormGroup = new FormGroup({
    name: new FormControl(['',Validators.required]),
    image: new FormControl(['',Validators.required])
  });

  ngOnInit(): void {
    this.GetStockItemColours()

    this.currentroute.params.subscribe(params =>{
      this.service.GetStockItemColour(params['id']).subscribe(result =>{
        this.ColourToEdit = result as StockItemColours;

        this.EditColourForm.controls['name'].setValue(this.ColourToEdit.ColorName);
        this.EditColourForm.controls['image'].setValue(this.ColourToEdit.Image);
      })
    })
  }

  GetStockItemColours(){
    this.service.GetStockItemColours().subscribe(result =>{
      this.stockitemcolours = result as StockItemColours[];
    })
  }

  getstockcolour(StockItemColorId:Number){
    this.service.GetStockItemColour(StockItemColorId).subscribe(result =>{
      this.stockitemcolours = result as StockItemColours[];
    })
  }
  addcolour(){
    let addedcolour = new StockItemColours();

    this.service.AddStockItemColour(addedcolour).subscribe((response: any) =>{
      if(response.statusCode == 200){
        this.thisroute.navigate(['./stockitemcolours'])
      }
      else{
        alert(response.message);
      }
    });
  }

  ColourToEdit!: StockItemColours;
  updatecolour(StockItemColorId:Number){ 
    this.currentroute.params.subscribe(params =>{
      this.service.GetStockItemColour(params['StockItemColorId']).subscribe(result =>{
        this.ColourToEdit = result as StockItemColours;
        this.EditColourForm.controls['name'].setValue(this.ColourToEdit.ColorName);
        this.EditColourForm.controls['image'].setValue(this.ColourToEdit.Image);

        if(this.EditColourForm.valid == true){
          this.service.UpdateStockItemColour(StockItemColorId, this.EditColourForm.value).subscribe((res: any) =>{
            console.log(result);
            this.canceleditmodal();
          })
        }
      })
    })
  }

  deletecolour(StockItemColorId:Number){
    this.service.DeleteStockItemColour(StockItemColorId).subscribe(result =>{
      console.log(result)
    })
  }
  
  reloadPage(){
    window.location.reload()
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
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

}
