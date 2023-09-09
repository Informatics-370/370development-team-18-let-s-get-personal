import { Component, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { BasketItems, OrderT } from '../Models/basket';
import { BasketService } from '../Services/basket.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Stock_Item } from '../Models/stockitem';
import { PersonalisationService } from '../Services/personalisation.service';
import { Personalisation_Design } from '../Models/personalisationdesign';
import { PersonalisationDesignVM } from '../ViewModels/personalisationdesignVM';
import jwt_decode from 'jwt-decode';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Design_Image } from '../Models/designimage';
import { Design_Text } from '../Models/designtext';
import { Design_Image_Line_Item } from '../Models/designimagelineitem';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule, RouterModule]
})
export class BasketPage implements OnInit {

  /*uploadFile(arg0: FileList|null) {
  throw new Error('Method not implemented.');
  }*/
  user: string = ""
  @ViewChild(IonModal) modal!: IonModal
  order = new OrderT();

  constructor(public modalCtrl: ModalController, private _router: Router,
    private service: PersonalisationService, private alertController: AlertController) {
    this.counter = document.querySelector("#counter");
    const storedQuantity = localStorage.getItem('basketQuantity');

  }

  cartItems: any[] = [];
  counter = document.querySelector("#counter");

  ngOnInit() {
    this.cartItems = JSON.parse(localStorage.getItem('cart') as string) || [];
    //this.reloadPage();

    // this.token=localStorage.getItem("token");

    //let decode=jwt_decode(this.token);

    //console.log(this.token);
    // Retrieve the cart item count from localStorage
  const cartItemCount = localStorage.getItem('cartItemCount');
  if (cartItemCount) {
    if (this.counter) {
      this.counter.innerHTML = cartItemCount;
    }
  }
  }



  public removeItemFromBasket(id: any): void {
    this.cartItems = this.cartItems.filter((cartItem) => cartItem.stock_Item.stock_Item_ID !== id);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  public async incrementQuantity(item: any) {

    if (item.basket_Quantity < 10) {
      item.basket_Quantity++;
      // Update the counter span
    this.updateCounterSpan(this.cartItems);

      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      // Store the cart item count before reloading the page
    this.storeCartItemCountInLocalStorage();
    }
    else {
      console.log("Maximum item reached!")
      const alert = await this.alertController.create({
        header: 'Alert!',
        subHeader: 'No more than 10 items. Send an email to request for large orders.',
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

  public decrementQuantity(item: any): void {
    if (item.basket_Quantity > 1) {
      item.basket_Quantity--;
      // Update the counter span
    this.updateCounterSpan(this.cartItems);

       localStorage.setItem('cart', JSON.stringify(this.cartItems));
       // Store the cart item count before reloading the page
    this.storeCartItemCountInLocalStorage();
    }
   
  }

  private updateCounterSpan(cartItems: any[]): void {
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.basket_Quantity, 0);
    localStorage.setItem('cartItemCount', totalQuantity.toString());
    if (this.counter) {
      this.counter.innerHTML = totalQuantity.toString();
    }
  }
  private storeCartItemCountInLocalStorage() {
    const totalQuantity = this.cartItems.reduce((sum, item) => sum + item.basket_Quantity, 0);
    localStorage.setItem('cartItemCount', totalQuantity.toString());
  }



  public calculateTotalPrice(): any {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += item.stock_Item.stock_Item_Price * item.basket_Quantity;
      localStorage.setItem('quantity', JSON.stringify(item.basket_Quantity));
    }
    this.order.price = totalPrice;
    return totalPrice;
  }

  public clearBasket() {
    this.cartItems = this.cartItems.filter((cartItem) => cartItem.stock_Item_ID);
    localStorage.removeItem('cart');
  }

  public shopall() {
    this._router.navigate(["/tabs/shop-all"])
  }

  public makepayment() {
    const existingItem = localStorage.getItem('cart');
    let items = JSON.parse(localStorage.getItem('cart') as string)

    this.order.basketItems = items;

    this.order.paid = false;


    localStorage.setItem("order", JSON.stringify(this.order));

    console.log(items);

    //change to checkout and go to deliveries then make payment 
    //this.AddImageToImageLineItem()
    // this.AddPersonalisation()
    //this._router.navigate(["/tabs/make-payment"])

    this.CheckPersonalised()
    //this.CheckUser()
  }

  CheckPersonalised(){
    let personalised = JSON.parse(JSON.stringify(localStorage.getItem('personalisedID')));
    if (personalised == null) {  //  [==="User"]
      this.PleasePersonalizeAlert()
    }
    else {
      this.CheckUser()
    }
  }

  CheckUser() {
    this.user = JSON.parse(JSON.stringify(localStorage.getItem('roles')));
    if (this.user == "User") {  //  [==="User"]
      this._router.navigate(['./tabs/make-payment']);
    }
    else {
      this._router.navigate(['./tabs/login']);
    }
  }

  //localStorage.setItem('roles', token[roleLongName]);
  /*==============PERSONALIZATION===========================================*/
  AddTextForm: FormGroup = new FormGroup({
    designText: new FormControl('', [Validators.required])
  });

  UploadImageForm: FormGroup = new FormGroup({
    designImage: new FormControl('', [Validators.required])
  });

  personalizations!: Personalisation_Design
  fileNameUploaded = ''
  errmsg: string = ""
  //  textprice: TextPrice[] =[]
  imageprice: any //Image_Price[] =[]
  imagepriceID!: string
  formData = new FormData();

  uploadedImage!: Design_Image;
  uploadedText!: Design_Text;
  isModalOpen = false;

  public personalize(id: any, isOpen: boolean) {
    localStorage.setItem("stockId", id);
    this.isModalOpen = isOpen;
  }

  uploadFile = (files: any) => {
    let fileToUpload = <File>files[0];
    this.formData.append('file', fileToUpload, fileToUpload.name); //
    this.fileNameUploaded = fileToUpload.name
  }

  uploadImage() {
    this.service.UploadDesignImage(this.formData).subscribe(result => {
      this.uploadedImage = result as Design_Image
    })

    try {
      console.log(this.uploadedImage)
      this.uploadText()
    }
    catch {
      this.addImageErrorAlert()
    }
  }

  uploadText() {
    let addedtext = new Design_Text()
    addedtext.design_Text_Description = this.AddTextForm.value.designText
    this.service.UploadDesignText(addedtext).subscribe(res => {
      this.uploadedText = res as Design_Text
    })
    try {
      console.log(this.uploadedText)
      this.UploadPersonalisation()
    }
    catch {

    }
  }

  UploadPersonalisation() {
    let personalisation = new PersonalisationDesignVM()
    //let stockId=localStorage.getItem("stockId");
    personalisation.design_Text_ID = this.uploadedText.design_Text_ID
    personalisation.design_Image_ID = this.uploadedImage.design_Image_ID
    personalisation.stock_Item_ID = JSON.parse(JSON.stringify(localStorage.getItem('stockId')));
    console.log(personalisation)
    try {
      this.service.AddPersonalisation(personalisation).subscribe(res => {
        this.personalizations = res as Personalisation_Design
        let personalisedID = this.personalizations.personalisation_Design_ID
        localStorage.setItem('personalisedID', JSON.stringify(personalisedID));
        this.addPersonalizationSuccessAlert()
      })
    }
    catch
    {
      this.addPersonalizationErrorAlert()
    }
  }

  canceladdmodal() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmaddmodal() {
    this.uploadImage()
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  reloadPage() {
    window.location.reload()
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

  async addTextErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Your personalization Text was not captured.',
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

  async addImageErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Your personalization Image was not captured.',
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

  async PleasePersonalizeAlert() {
    const alert = await this.alertController.create({
      header: 'Please Add Your Personalisation!',
      // subHeader: 'Your personalization was captured.',
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
  
//confirm add modal
    // let items = JSON.parse(localStorage.getItem('cart') as string) || [];
    // let existingItem:BasketItems = items.find((cartItem:any) => cartItem.stock_Item.stock_Item_ID === stockId);

    // let design_Text = this.AddForm.value.designText;
    // let image_File = "Kamo";

    // if(existingItem){
    //   //items.push({ ...existingItem, personalization. : 1 });
    //   existingItem.personalization.personalizationText=design_Text;
    //   existingItem.personalization.img=image_File;
    //   localStorage.removeItem("stockId");


    // localStorage.setItem('cart',JSON.stringify(items));

    //try{
    //this.personalize(); 
    /*this._router.navigate(["/tabs/personalisation"])  
    }
    catch{
      this.addPersonalizationErrorAlert();
    }*/

  // addPersonalization(){
  //   let stockId=localStorage.getItem("stockId");

  //   let items = JSON.parse(localStorage.getItem('cart') as string) || [];
  //   let existingItem:BasketItems = items.find((cartItem:any) => cartItem.stock_Item.stock_Item_ID === stockId);

  //   // this.formData.append('designText', this.AddForm.get('designText')!.value);
  //   // this.formData.append('designImage', this.AddForm.get('designImage')!.value); 

  //  //let design_Text = this.AddForm.value.designText;
  //  //let image_File = this.UploadImage.value.imageFile;

  //  if(existingItem)
  //  {
  //    //items.push({ ...existingItem, personalization. : 1 });
  //    //existingItem.personalization.personalizationText=design_Text;
  //    //existingItem.personalization.img=image_File;
  //    localStorage.removeItem("stockId");
  //   }

  //  //localStorage.setItem('cart',JSON.stringify(items));      
  // }

  /*
  confirmaddmodal() {
    let stockId=localStorage.getItem("stockId");

   let items = JSON.parse(localStorage.getItem('cart') as string) || [];
   let existingItem:BasketItems = items.find((cartItem:any) => cartItem.stock_Item.stock_Item_ID === stockId);
  
  let design_Text = this.AddForm.value.designText;
  //let image_File = this.UploadImage.value.imageFile;

  if(existingItem){
    //items.push({ ...existingItem, personalization. : 1 });
    existingItem.personalization.personalizationText=design_Text;
    //existingItem.personalization.img=image_File;
    localStorage.removeItem("stockId");
  }
  localStorage.setItem('cart',JSON.stringify(items));
  this._router.navigate(["/tabs/personalisation"])
  }

  }*/


}
