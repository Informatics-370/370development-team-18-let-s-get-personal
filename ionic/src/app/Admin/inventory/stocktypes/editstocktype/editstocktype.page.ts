import { Component, OnInit, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StockTypes } from 'src/app/Models/stocktypes';
import { StockTypeDataService } from 'src/app/Services/stocktype.service';
import { AlertController } from '@ionic/angular';
import { FormsModule, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//for modal
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-editstocktype',
  templateUrl: './editstocktype.page.html',
  styleUrls: ['./editstocktype.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [StockTypeDataService]
})
export class EditstocktypePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal
  //stocktypes: StockTypes[] =[];
  stocktype: any
  constructor(public modalCtrl: ModalController, private service:StockTypeDataService,
    private router: Router,  private alertController: AlertController, private route:ActivatedRoute) { }

  EditTypeForm:FormGroup = new FormGroup({
    name: new FormControl(['',Validators.required])
  });

  ngOnInit(): void {
    this.service.GetStockType(+this.route.snapshot.params['id']).subscribe(result =>{
      this.stocktype = result
      this.stocktype.patchValue({
        name: this.stocktype.name,
      });
    })
  }
  onSubmit(){
    this.service.UpdateStockType(this.stocktype.stock_Type_ID, this.EditTypeForm.value).subscribe(result =>{
      this.router.navigate(['/stocktypes'])
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
