import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { ProductRatingDataService } from 'src/app/Services/productrating.service';
import { ProductRating } from 'src/app/Models/productrating';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, } from '@angular/forms';
import { Stock_Item } from 'src/app/Models/stockitem';

//for modal
import { ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

enum COLORS {
  GREY = "E0E0E0",
  GREEN = "#76FF03",
  YELLOW = "#FFCA28",
  RED = "#DD2C00"
}

@Component({
  selector: 'app-product-rating',
  templateUrl: './product-rating.page.html',
  styleUrls: ['./product-rating.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ProductRatingPage implements OnInit {

  @Input()
  rating!: number;

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();
  

  @ViewChild(IonModal) modal!: IonModal;
  constructor(private _modalController: ModalController, private _router: Router, private alertController: AlertController,
    private service: ProductRatingDataService) { }

  AddForm: FormGroup = new FormGroup({
    prodRating: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required])
  })


  productRatings: ProductRating[] = [];
  stockItems: Stock_Item[] = [];

  ngOnInit() {
  }
  rate(index: number) {
    this.rating = index;
    this.ratingChange.emit(this.rating);
    console.log(this.rating)
  }

  getColor(index: number) {
    if (this.isAboveRating(index)) {
      return COLORS.GREY;
    }
    switch (this.rating) {
      case 1:
      case 2:
        return COLORS.RED;
      case 3:
        return COLORS.YELLOW;
      case 4:
      case 5:
        return COLORS.GREEN;
      default:
        return COLORS.GREY;
    }
  }

  isAboveRating(index: number): boolean {
    return index >this.rating;
  }



  public updateProdRating(product_Rating_ID: string) {
    this._router.navigate(["/tabs/edit-product-rating"])
  }


  AddProdRating(Stock_Item_ID: string) {
    let AddProdRating = new ProductRating();

    AddProdRating.product_Star_Rating = this.AddForm.value.prodRating;
    AddProdRating.product_Rating_Comments = this.AddForm.value.comment;

    this.service.AddProductRating(AddProdRating).subscribe(response => {
      if (response.status == "Error") {
        this.addProdRatingErrorAlert();
      }
      else {
        this.addProdRatingSuccessAlert();
      }
    })
  }

  DeleteProductRating(product_Rating_ID: string) {
    // this.service.DeleteProductRating(product_Rating_ID).subscribe(result => {
    //   console.log(result);
    //   if (result.status == "Error") {
    //     this.DeleteProdRatingErrorAlert();
    //   }
    //   else if (result.status == "Success") {
    //     this.DeleteProdRatingSuccessAlert();
    //   }
    // })
  }


  reloadPage() {
    window.location.reload()
  }

  canceladdmodal() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmaddmodal() {
    this.AddProdRating(Stock_Item.name);  //??
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  async addProdRatingSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Your product rating was captured.',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          this.reloadPage();
        }
      }],
    });
    await alert.present();
  }
  async addProdRatingErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Your product rating was not captured.',
      message: 'Please try again',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          this.reloadPage();
        }
      }],
    });
    await alert.present();
  }



  async DeleteProdRatingSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Your product rating is successfully deleted!',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          this.reloadPage();
        }
      }],
    });
    await alert.present();
  }

  async DeleteProdRatingErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Your Product Rating Was Unfortunately Not Deleted.',
      message: 'Please try again',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          this.reloadPage();
        }
      }],
    });
    await alert.present();
  }


}
