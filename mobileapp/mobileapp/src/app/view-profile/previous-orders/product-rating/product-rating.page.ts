import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { ProductRatingDataService } from 'src/app/Services/productrating.service';
import { ProductRating } from 'src/app/Models/productrating';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Stock_Item } from 'src/app/Models/stockitem';
import { ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { SalesVM } from 'src/app/ViewModels/salesVM';
import { SalesService } from 'src/app/Services/sales.service';
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
  comment: any;
  prodRatings: ProductRating[] = [];
  results: any;
  customerId: any;
  orders: SalesVM [] = []
  @ViewChild(IonModal) modal!: IonModal;
  productRatings: ProductRating[] = [];
  stockItems: Stock_Item[] = [];
 /* @Input()
  rating!: number;

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();*/
  

  constructor(private _modalController: ModalController, private _router: Router, 
    private alertController: AlertController, private service: ProductRatingDataService,
    private saleservice: SalesService) { }

  

  ngOnInit() {
    this.customerId = localStorage.getItem("customerID");
    console.log(this.customerId);
    this.getRatingByCustomerID(this.customerId.replace(/"/g, ''));
    this.getPreviousOrders();
  }

  getPreviousOrders(){
    this.service.GetProductRatingByCustomerID(this.customerId).subscribe(result =>{
      this.orders = result as SalesVM[]
    })
  }

  private getRatingByCustomerID(customer_ID: any): void {

    console.log(customer_ID);

    this.service.GetProductRatingByCustomerID(customer_ID).subscribe(res => {
      this.results = res;
      this.prodRatings = this.results;
    }, error => {
      console.log(error);
    })
  }

  //========== Add ==========
  isAddModalOpen = false;  
  stockitemName!: string
  AddRating(stock_Item_ID: string, isAddOpen: boolean, stock_Item_Name:string){
    localStorage.setItem('RatingStockID', stock_Item_ID);
    this.stockitemName = stock_Item_Name;
    this.isAddModalOpen = isAddOpen;
  }

  public submitRating(): void {
    this.comment = this.AddForm.get('comment')?.value;
    console.log("Rating " + this.selectedRating + "\nComment " + this.comment);
  }

  AddForm: FormGroup = new FormGroup({
    comment: new FormControl('', [Validators.required]),
  });

  selectedRating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];

  rateExperience(rating: number): void {
    this.selectedRating = rating;
  }
  
  rating: ProductRating = new ProductRating();
  confirmaddmodal(/*Stock_Item_ID: string*/ ) {
    this.comment = this.AddForm.get('comment')?.value;

    this.rating.stock_Item_ID = JSON.parse(JSON.stringify(localStorage.getItem('RatingStockID')));
    this.rating.customer_ID = this.customerId.replace(/"/g, '')
    this.rating.product_Rating_Comments = this.comment;
    this.rating.product_Star_Rating = this.selectedRating;

    try {
      this.service.AddProductRating(this.rating).subscribe(res => {
       this.addProdRatingSuccessAlert();
      }, error => {
        console.log(error);
      })
    } catch {
      this.addProdRatingErrorAlert()
    }
    if (this.comment = null) {
      this.addProdRatingErrorAlert()
    }
  }

  canceladdmodal() {
    this.modal.dismiss(null, 'cancel');
  }


  //========== Edit ==========
  isModalOpen = false;
  editForm: FormGroup = new FormGroup({
    selectedRating: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required]),
  })
  editProdRating: ProductRating = new ProductRating();

  EditExpRating(product_Rating_ID: string, isOpen: boolean) {
    this.service.GetProductRating(product_Rating_ID).subscribe(response => {

      this.editProdRating = response as ProductRating;
      this.editForm.controls['selectedRating'].setValue(this.editProdRating.product_Star_Rating);
      this.editForm.controls['comment'].setValue(this.editProdRating.product_Rating_Comments);
    })
    this.isModalOpen = isOpen;
  }

  canceleditmodal() {
    this.isModalOpen = false;
  }

  confirmEditmodal() {    
    let editedProdRating = new ProductRating();
    editedProdRating.product_Star_Rating = this.selectedRating;
    editedProdRating.product_Rating_Comments = this.editForm.get('comment')?.value;
    console.log(editedProdRating)
    try {
      this.service.UpdateProductRating(this.editProdRating.product_Rating_ID, editedProdRating).subscribe(result => {
        this.editProdRatingSuccessAlert();
      })
    }
    catch {
      this.editProdRatingErrorAlert();
    }
  }
 
  DeleteProductRating(product_Rating_ID: string) {
     this.service.DeleteProductRating(product_Rating_ID).subscribe(result => {
       console.log(result);
       if (result.status == "Error") {
         this.DeleteProdRatingErrorAlert();
       }
       else if (result.status == "Success") {
         this.DeleteProdRatingSuccessAlert();
      }
     })
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

//Alerts 

  reloadPage() {
    window.location.reload()
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

  async editProdRatingSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Product Rating Updated',
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

  async editProdRatingErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Product Rating Was Not Updated',
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
//AddForm: FormGroup = new FormGroup({
  //   prodRating: new FormControl('', [Validators.required]),
  //   comment: new FormControl('', [Validators.required])
  // })
/* rate(index: number) {
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
  }*/


  
  /*AddProdRating(Stock_Item_ID: string) {
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
  }*/
