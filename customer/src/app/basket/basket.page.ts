import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { RouterModule, Router, NavigationExtras } from '@angular/router';
import { BasketItems, OrderT } from '../Models/basket';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PersonalisationService } from '../Services/personalisation.service';
import { Personalisation_Design } from '../Models/personalisationdesign';
import { PersonalisationDesignVM } from '../ViewModels/personalisationdesignVM';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Design_Image } from '../Models/designimage';
import { Design_Text } from '../Models/designtext';
import { ChangeDetectorRef } from '@angular/core';


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
  storedData: any;

  ionViewDidEnter() {

    console.log("Reloaded");

    try {
      this.storedData = localStorage.getItem('cart') as string;
      if (this.storedData) {
        this.cartItems = JSON.parse(this.storedData);
      } else {
        this.cartItems = [];
      }
      console.log('cartItems', this.cartItems);
      this.cdr.detectChanges(); // Trigger change detection
    } catch (error) {
      console.error('Error parsing data from localStorage:', error);
      this.cartItems = []; // Set a default value or handle the error as needed.
      this.cdr.detectChanges(); // Trigger change detection
    }
  }

  constructor(public modalCtrl: ModalController, private _router: Router, private cdr: ChangeDetectorRef,
    private service: PersonalisationService, private alertController: AlertController) {
    this.counter = document.querySelector("#counter");
    const storedQuantity = localStorage.getItem('basketQuantity');

  }

  cartItems: any[] = [];
  counter = document.querySelector("#counter");

  ngOnInit() {
    /* this.cartItems = JSON.parse(localStorage.getItem('cart') as string) || [];
    console.log(this.cartItems);*/
    // this.token=localStorage.getItem("token");
    //let decode=jwt_decode(this.token);
    //console.log(this.token);

    /* Retrieve the cart item count from localStorage*/
    const cartItemCount = localStorage.getItem('cartItemCount');
    if (cartItemCount) {
      if (this.counter) {
        this.counter.innerHTML = cartItemCount;
      }
    }
  }

  view(item: any[]) {
    // Navigate to the "personalisation" page and pass the selected "item" object
    this._router.navigate(['/tabs/personalisation'], { queryParams: { item: JSON.stringify(item) } });
    //this._router.navigate(['/tabs/personalisation',JSON.stringify(item)]);
  }



  public removeItemFromBasket(id: any): void {
    this.cartItems = this.cartItems.filter((cartItem) => cartItem.stock_Item.stock_Item_ID !== id);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    //update the quantity cartItemCount
    //!!!!!!!!!!!!!
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
      //localStorage.setItem('quantity', JSON.stringify(item.basket_Quantity));
    }
    this.order.price = totalPrice;
    return totalPrice;
  }

  public clearBasket() {
    this.cartItems = this.cartItems.filter((cartItem) => cartItem.stock_Item_ID);
    localStorage.removeItem('cart');
    localStorage.removeItem('cartItemCount');
    localStorage.removeItem('quantity');
    localStorage.removeItem('Image-URL');
    localStorage.removeItem('stockId');
    localStorage.removeItem('addressID');
    localStorage.removeItem('deliveryID');
    localStorage.removeItem("order")
    localStorage.removeItem("selectedItem")
    this.reloadPage();
  }

  public shopall() {
    this._router.navigate(["/tabs/shop-all"])
  }

  public makepayment() {

    this.CheckPersonalised();

    if (!this.CheckPersonalised()) {
      try {

      } catch {
        const existingItem = localStorage.getItem('cart');
        let items = JSON.parse(localStorage.getItem('cart') as string)
        /*to make space in the local storage
        localStorage.removeItem("stockId")
        localStorage.removeItem("stockId")
        localStorage.removeItem("stockId")*/

        console.log('items parsed', items)
        this.order.basketItems = items;
        this.order.paid = false;

        localStorage.setItem("order", JSON.stringify(this.order));
        console.log('order', items);

        this.uploadImage();
        //this.UploadPersonalisation();
        //change to checkout and go to deliveries then make payment 
        //this.AddImageToImageLineItem() 
        // this.AddPersonalisation()
        //this._router.navigate(["/tabs/make-payment"])
      }

    }


  }

  CheckPersonalised() {
    //let personalised = JSON.parse(JSON.stringify(localStorage.getItem('personalisedID')));
    let personalised = JSON.parse(JSON.stringify(localStorage.getItem('stockId')));

    if (personalised == null) {  //  [==="User"]
      this.PleasePersonalizeAlert()
      return false;
    }
    else {
      this.CheckUser()
      return true;
    }
  }

  CheckUser() {
    this.user = JSON.parse(JSON.stringify(localStorage.getItem('roles')));
    if (this.user === "User") {  //  [==="User"]
      this._router.navigate(['./tabs/make-payment']);
    }
    else {
      this._router.navigate(['./tabs/login']);
    }
  }

  //localStorage.setItem('roles', token[roleLongName]);
  AddTextForm: FormGroup = new FormGroup({
    designText: new FormControl('', [Validators.required])
  });

  UploadImageForm: FormGroup = new FormGroup({
    designImage: new FormControl('', [Validators.required])
  });

  personalizations!: Personalisation_Design;
  fileNameUploaded = '';
  errmsg: string = "";
  formData = new FormData();

  uploadedImage!: Design_Image;
  uploadedText!: Design_Text;
  isModalOpen = false;

  public personalize(id: any, isOpen: boolean) {
    localStorage.setItem("stockId", id);
    this.isModalOpen = isOpen;
  }

  public update(id: any, isOpen: boolean) {
    localStorage.setItem("stockId", id);
    this.isModalOpen = isOpen;
  }

  uploadFile = (files: any) => {
    let fileToUpload = <File>files[0];
    this.formData.append('file', fileToUpload, fileToUpload.name);
    this.fileNameUploaded = fileToUpload.name
    /****sTORING THE IMAGE URL IN THE LOCAL STORAGE****/
    if (fileToUpload) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        localStorage.setItem("Image-URL", reader.result as string);
      });

      reader.readAsDataURL(fileToUpload);
      console.log(fileToUpload)
    }
  }

  uploadImage() {
    this.service.UploadDesignImage(this.formData).subscribe(result => {
      this.uploadedImage = result as Design_Image
      console.log('Image API', this.uploadedImage)
      this.uploadText()
    })
  }

  uploadText() {
    let addedtext = new Design_Text()
    addedtext.design_Text_Description = this.AddTextForm.value.designText
    this.service.UploadDesignText(addedtext).subscribe(res => {
      this.uploadedText = res as Design_Text
      console.log('Text API', this.uploadedText)
    })
  }

  UploadPersonalisation() {

    let personalisation = new PersonalisationDesignVM()
    if (personalisation) {
      //let stockId=localStorage.getItem("stockId");
      personalisation.design_Text_ID = this.uploadedText.design_Text_ID
      personalisation.design_Image_ID = this.uploadedImage.design_Image_ID
      //personalisation.design_Text = this.AddTextForm.get("designText")?.value;
      //personalisation.image_File = this.UploadImageForm.get("designImage")?.value;
      personalisation.stock_Item_ID = JSON.parse(JSON.stringify(localStorage.getItem('stockId')));

      this.service.AddPersonalisation(personalisation).subscribe(res => {
        this.personalizations = res as Personalisation_Design
        let personalisedID = this.personalizations.personalisation_Design_ID
        localStorage.setItem('personalisedID', JSON.stringify(personalisedID));
        console.log('Both', personalisation);
        this.addPersonalizationSuccessAlert()
      },
        (error) => {
          this.addPersonalizationErrorAlert()
          console.error('Upload error:', error);
        })
    }

  }

  canceladdmodal() {
    localStorage.removeItem("stockId");
    this.modal.dismiss(null, 'cancel');
  }
  

  /*confirmaddmodal() {
    this.isModalOpen = false;
    //this.uploadImage()
  }*/

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    this.isModalOpen = false;
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

  /******************************************************************************************************************************************* */


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


  AddForm: FormGroup = new FormGroup({
    designText: new FormControl('', [Validators.required]),
    designImage: new FormControl('', [Validators.required])
  });


  addPersonalization() {

    let personalisation = new PersonalisationDesignVM()
    //let stockId=localStorage.getItem("stockId");
    personalisation.design_Text = this.AddForm.get("designText")?.value;
    personalisation.image_File = this.AddForm.get("designImage")?.value;
    //personalisation.stock_Item_Name = JSON.parse(JSON.stringify(localStorage.getItem('stockId')));
    console.log('addPers', personalisation)
  }

  isEmptyObject(obj: any) {
    return Object.keys(obj).length === 0;
  }

  confirmaddmodal() {
    let stockId = localStorage.getItem("stockId");

    let items = JSON.parse(localStorage.getItem('cart') as string) || [];
    let existingItem: BasketItems = items.find((cartItem: any) => cartItem.stock_Item.stock_Item_ID === stockId);

    let design_Text = this.AddTextForm.get('designText')?.value;
    //let image_File = this.UploadImageForm.get("designImage")?.value;
    let image_File = localStorage.getItem("Image-URL") ?? "";
    if (existingItem) {
      //items.push({ ...existingItem, personalization. : 1 });
      existingItem.personalization.personalizationText = design_Text;
      existingItem.personalization.img = image_File;
      //localStorage.removeItem("stockId");
      console.log('LocalStorage cart', existingItem)
    }
    localStorage.setItem('cart', JSON.stringify(items));
    //this.uploadImage();
    //this.UploadPersonalisation();
    this.addPersonalizationSuccessAlert();
  }

}
