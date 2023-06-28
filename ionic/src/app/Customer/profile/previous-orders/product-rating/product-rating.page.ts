import { Component, OnInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProductRatingDataService } from 'src/app/Services/productrating.service';
import { ProductRating } from 'src/app/Models/productrating';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

//for modal
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';



@Component({
  selector: 'app-product-rating',
  templateUrl: './product-rating.page.html',
  styleUrls: ['./product-rating.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [ProductRatingDataService]
})
export class ProductRatingPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal
  productratings: ProductRating[] =[];

  constructor(public modalCtrl: ModalController,private service:ProductRatingDataService,
    private router: Router, private currentroute: ActivatedRoute, private alertController: AlertController) { }

    AddTypeForm:FormGroup = new FormGroup({
      name: new FormControl(['',Validators.required])      
    }); 

  ngOnInit():void {
    this.GetProductRating();
  }
  GetProductRating(){
    this.service.GetProductRatings().subscribe(result =>{
      let productratinglist: any[] = result
      productratinglist.forEach((element)=>{
        this.productratings.push(element)
      });
     })
  }

  AddProductRating(){
    this.service.AddProductRating(this.AddTypeForm.value).subscribe(result => {
      this.canceladdmodal();
      console.log(result);        
      this.modal.dismiss('Continue');
      window.location.reload();
  })
}

  getproductrating(ProductRatingId:Number){
    //[routerLink]="['/course', course.courseId]"
    this.router.navigate(['./edit-product-rating',ProductRatingId]);
  }

  UpdateProductRating(ProductRatingId:Number){
    this.router.navigate(['./edit-product-rating',ProductRatingId]);
  }

  DeleteProductRating(ProductRatingId:Number){
    this.service.DeleteProductRating(ProductRatingId).subscribe(result =>{
      window.location.reload();
     });
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
