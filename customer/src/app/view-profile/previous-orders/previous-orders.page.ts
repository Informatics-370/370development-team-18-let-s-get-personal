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
import { ProductRatingVM } from 'src/app/ViewModels/productratingVM';

@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.page.html',
  styleUrls: ['./previous-orders.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class PreviousOrdersPage implements OnInit { 
  orders: SalesVM[] =[]
  comment: any;  
  customerId: any;
  @ViewChild(IonModal) modal!: IonModal;
  productRatings: ProductRatingVM[] = [];
  stockItems: Stock_Item[] = [];

  constructor(private _modalController: ModalController, private _router: Router, 
    private alertController:AlertController, private ratingservice: ProductRatingDataService) { }


  ngOnInit() {    
    // this.customerId = JSON.parse(JSON.stringify(localStorage.getItem('customerID'))) //localStorage.getItem("customerID");
    // console.log(this.customerId);
    this.customerId = localStorage.getItem("customerID");
    this.getCustomerOrders() //this.customerId
    this.getCustomerRatings(); //.replace(/"/g, '')
  }

  getCustomerOrders(){ 
    this.customerId = localStorage.getItem("customerID"); 
    console.log(this.customerId);

    try
    {
      this.ratingservice.getPreviousOrders(this.customerId).subscribe(result =>{
        this.orders = result as SalesVM[]
        console.log(this.orders)
      })
    }
    catch
    {
      this.getErrorAlert()
    }
    
  }


  private getCustomerRatings() {
    this.ratingservice.GetProductRatingByCustomerID(this.customerId).subscribe(res => {
      this.productRatings = res as ProductRatingVM[];
      console.log(this.productRatings)
    })
  }

//========== Add ==========
  isAddModalOpen = false;  
  stockitemName!: string
  stockitemid!: string
  AddRating(isAddOpen: boolean){
    //localStorage.setItem('RatingStockID', stock_Item_ID);    
    // this.stockitemid = stock_Item_ID
    // console.log(stock_Item_ID)
    // this.stockitemName = stock_Item_Name;
    this.isAddModalOpen = isAddOpen;
  }

  public submitRating(): void {
    this.comment = this.AddForm.get('comment')?.value;
    console.log("Rating " + this.selectedRating + "\nComment " + this.comment);
  }

  AddForm: FormGroup = new FormGroup({
    comment: new FormControl('', [Validators.required]),
    stockitemID: new FormControl('', [Validators.required]),
  });

  selectedRating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];

  rateExperience(rating: number): void {
    this.selectedRating = rating;
  }

  confirmaddmodal(/*Stock_Item_ID: string*/ ) {
    this.comment = this.AddForm.get('comment')?.value;
    console.log(this.comment)
    let rated = new ProductRating();

    rated.stock_Item_ID = this.AddForm.value.stockitemID
    rated.customer_ID = this.customerId
    rated.product_Rating_Comments = this.AddForm.value.comment;
    rated.product_Star_Rating = this.selectedRating;

    try {
      console.log(rated)
      this.ratingservice.AddProductRating(rated).subscribe(res => {
       this.addProdRatingSuccessAlert();
      }, error => {
        console.log(error);
      })
    } 
    catch 
    {
      this.addProdRatingErrorAlert()
    }
  }

  canceladdmodal() {
    this.modal.dismiss(null, 'cancel');
  }

//========== Edit ==========
   isModalOpen = false;
   prodratingID!: string
   editProdRating: any;
   editForm: FormGroup = new FormGroup({
     //selectedRating: new FormControl('', [Validators.required]),
     comment: new FormControl('', [Validators.required]),
   })   
   
   editStockName!: string
   currentRating!: number
   EditExpRating(product_Rating_ID: string, isOpen: boolean) {
    this.prodratingID = product_Rating_ID
     this.ratingservice.GetProductRating(product_Rating_ID).subscribe(response => {        
       this.editProdRating = response as ProductRatingVM;
       console.log(response)
       this.editStockName = this.editProdRating.stock_Item_Name
       this.currentRating = this.editProdRating.product_Star_Rating
       //this.editForm.controls['selectedRating'].setValue(this.editProdRating.product_Star_Rating);
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
       this.ratingservice.UpdateProductRating(this.prodratingID, editedProdRating).subscribe(result => {
         this.editProdRatingSuccessAlert();
       })
     }
     catch {
       this.editProdRatingErrorAlert();
     }
   }
  
   DeleteProductRating(product_Rating_ID: string) {
      this.ratingservice.DeleteProductRating(product_Rating_ID).subscribe(result => {
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

  public ProductRating() {
    this._router.navigate(["/tabs/product-rating"])
  }

  public ContactUs() {
    this._router.navigate(["/tabs/contact-us"])
  }

  reloadPage() {
    window.location.reload()
  }

//========== Alerts ========== 

async getErrorAlert() {
  const alert = await this.alertController.create({
    header: 'We are sorry!',
    subHeader: 'We Could not find your Order',
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

async CantSeeOrder() {
  const alert = await this.alertController.create({
    header: 'Please note:',
    subHeader: 'We only show orders that have been delivered.',
    message:'If you have your order and still can not see it please contact us on our contact us page.',
    buttons: [{
      text: 'OK',
      role: 'cancel',
      handler: () => {
        this.reloadPage();
      }
    },{
      text: 'Contact Us',
      //role: 'cancel',
      handler: () => {
        this.ContactUs();
      }
    }],
  });
  await alert.present();
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
