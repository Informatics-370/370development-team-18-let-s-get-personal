import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
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
  selector: 'app-editstockitemcolours',
  templateUrl: './editstockitemcolours.page.html',
  styleUrls: ['./editstockitemcolours.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class EditstockitemcoloursPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal
  //stockitemcolours: StockItemColours[] = [];
  colour: any;
  yourImageDataURL: any;
  constructor(public modalCtrl: ModalController, private toast: ToastController, 
    private service:StockItemColourDataService,
    private router: Router, private route: ActivatedRoute, private alertController: AlertController) { }

    EditColourForm:FormGroup = new FormGroup({
      name: new FormControl(['',Validators.required]),
      image: new FormControl(['',Validators.required])
    });

  ngOnInit(): void {
   
    this.service.GetStockItemColour(+this.route.snapshot.params['id']).subscribe(result =>{
      this.colour = result
      this.colour.patchValue({
        name: this.colour.name
      });
    }) 
  }
  onSubmit(){
    this.service.UpdateStockItemColour(this.colour.stock_Item_Colour_ID, this.EditColourForm.value).subscribe(result =>{
      this.router.navigate(['/stockitemcolour'])
    })
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
    
    this.onSubmit();
    this.modal.dismiss('Continue');
  }
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }
}
