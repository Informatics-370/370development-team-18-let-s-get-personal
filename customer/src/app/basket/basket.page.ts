import { Component, EventEmitter, OnInit,ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { RouterModule,Router } from '@angular/router';
import { BasketItems } from '../Models/basket';
import { BasketService } from '../Services/basket.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ModalController} from '@ionic/angular'; 
import { Stock_Item } from '../Models/stockitem';
import { PersonalisationService } from '../Services/personalisation.service';
import { Personalisation_Design } from '../Models/personalisationdesign';
//import { Customer } from '../Models/customer';

//for modal

import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule,ReactiveFormsModule,RouterModule]
})
export class BasketPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal
  constructor(private basketservice:BasketService, public modalCtrl: ModalController,
    private _router:Router,
    private service:PersonalisationService,private alertController: AlertController){ this.basketItemList = JSON.parse(localStorage.getItem('basket')!);}//,private companyservice:DeliveryCompanyDataService) { }

    personalizations: Personalisation_Design[] = [];

  basketItems: BasketItems[] = [];
  //customers:Customer[]=[];
  cartItems:any[]=[];

  AddForm: FormGroup = new FormGroup({
    designText: new FormControl('', [Validators.required])
  })
  ngOnInit() {
   // this.GetBasketFromAPI();
   this.cartItems = JSON.parse(localStorage.getItem('cart') as string) || [];
  }

  private basketItemList: BasketItems[];
  

  public removeItemFromBasket(item: any):void {
    this.cartItems = this.cartItems.filter((cartItem) => cartItem.id !== item.id);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
  
  public incrementQuantity(item: any):void {
    item.quantity++;
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  public decrementQuantity(item: any):void {
    if (item.quantity > 1) {
      item.quantity--;
    }
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  public calculateTotalPrice():any {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += item.price * item.quantity;
    }
    return totalPrice;
  }

  public clearBasket() {
    localStorage.removeItem(BasketItems.name);
   // this.notifyOnNewItemInCart();
  }

  public shopall(){
    this._router.navigate(["/tabs/shop-all"])
  }
  public  personalize(){
    //this.AddPersonalisation();
    
    this._router.navigate(["/tabs/personalisation"])
  }

  public  makepayment(){
    this._router.navigate(["/tabs/make-payment"])
  }

  AddPersonalisation() {
    let AddPersonalisation = new Personalisation_Design();

    AddPersonalisation.design_Text.design_Text_Description = this.AddForm.value.designText;
    AddPersonalisation.design_Image=this.AddForm.value.design_Image;

    this.service.AddPersonalisation(AddPersonalisation).subscribe(response => {
      if (response.status == "Error") {
        this.addPersonalizationErrorAlert();
      }
      else {
        this.addPersonalizationSuccessAlert();
      }
    })
  }
  async addPersonalizationSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Your personalization was captured.',
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
  reloadPage() {
    window.location.reload()
  }
  async addPersonalizationErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Your personalization was not captured.',
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
  canceladdmodal() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmaddmodal() {
    this.AddPersonalisation();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }
}
