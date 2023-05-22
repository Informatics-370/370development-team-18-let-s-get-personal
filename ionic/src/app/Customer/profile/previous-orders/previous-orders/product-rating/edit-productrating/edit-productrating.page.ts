import { Component, OnInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductRating } from 'src/app/Models/productrating';
import { ProductRatingDataService } from 'src/app/Services/productrating.service';
import { AlertController } from '@ionic/angular';
import { FormsModule, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//for modal
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-edit-productrating',
  templateUrl: './edit-productrating.page.html',
  styleUrls: ['./edit-productrating.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule],
  providers: [ProductRatingDataService]
})
export class EditProductratingPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal
  //productratings: ProductRating[] =[];
productrating:any
  route: any;
  constructor(public modalCtrl: ModalController, private service:ProductRatingDataService,
    private router: Router, private currentroute: ActivatedRoute, private alertController: AlertController) { }
    
    EditTypeForm:FormGroup = new FormGroup({
      name: new FormControl(['',Validators.required])      
    });

  ngOnInit():void {
    this.service.GetProductRating(+this.route.snapshot.params['id']).subscribe(result =>{
      this.productrating = result
      this.productrating.patchValue({
        name: this.productrating.rating,
      });
    })
  }
  onSubmit(){
    this.service.UpdateProductRating(this.productrating.ProductRatingId, this.EditTypeForm.value).subscribe(result =>{
      this.router.navigate(['/productratings'])
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

