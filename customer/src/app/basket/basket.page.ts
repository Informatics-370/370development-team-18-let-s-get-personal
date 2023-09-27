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
import { Design_Text } from '../Models/designtext';
import { Design_Image } from '../Models/designimage';
import { ChangeDetectorRef } from '@angular/core';
import { DiscountService } from '../Services/discount.service';
import { Discount } from '../Models/discount';
import { AuditTrailService } from '../Services/audittrail.service';
import { AuditTrail } from '../Models/audittrail';
@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule, RouterModule]
})
export class BasketPage implements OnInit {
  user: string = ""
  @ViewChild(IonModal) modal!: IonModal
  order = new OrderT();
  storedData: any;
  vatprice!: number

  cartItems: any[] = [];
  counter = document.querySelector("#counter");

  constructor(public modalCtrl: ModalController, private _router: Router, private cdr: ChangeDetectorRef,
    private service: PersonalisationService, private alertController: AlertController,
    private discountservice: DiscountService, private auditservice: AuditTrailService) {
    this.counter = document.querySelector("#counter");
    const storedQuantity = localStorage.getItem('basketQuantity');
  }

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

      this.CheckDiscount()
    } catch (error) {
      console.error('Error parsing data from localStorage:', error);
      this.cartItems = []; // Set a default value or handle the error as needed.
      this.cdr.detectChanges(); // Trigger change detection
    }
  }

  ngOnInit() {
    /* this.cartItems = JSON.parse(localStorage.getItem('cart') as string) || [];
    console.log(this.cartItems);*/
    // this.token=localStorage.getItem("token");
    //let decode=jwt_decode(this.token);
    //console.log(this.token);

    this.CheckDiscount()
    /* Retrieve the cart item count from localStorage*/
    const cartItemCount = localStorage.getItem('cartItemCount');
    if (cartItemCount) {
      if (this.counter) {
        this.counter.innerHTML = cartItemCount;
      }
    }
  }

  //==================== Routes ====================
  view(item: any[]) {
    // Navigate to the "personalisation" page and pass the selected "item" object
    this._router.navigate(['/tabs/personalisation'], { queryParams: { item: JSON.stringify(item) } });
    //this._router.navigate(['/tabs/personalisation',JSON.stringify(item)]);
  }

  public ContactUs() {
    this._router.navigate(["/tabs/contact-us"])
  }

  public shopall() {
    this._router.navigate(["/tabs/shop-all"])
  }

  reloadPage() {
    window.location.reload()
  }


  //==================== Basket Quantity ====================
  public removeItemFromBasket(id: any): void {
    this.cartItems = this.cartItems.filter((cartItem) => cartItem.stock_Item.stock_Item_ID !== id);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    //update the quantity cartItemCount
    this.storeCartItemCountInLocalStorage();
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

  public clearBasket() {
    this.cartItems = this.cartItems.filter((cartItem) => cartItem.stock_Item_ID);
    localStorage.removeItem('cart');
    localStorage.removeItem('cartItemCount');
    localStorage.removeItem('quantity');
    localStorage.removeItem('Image-URL');
    localStorage.removeItem('stockId');
    localStorage.removeItem('addressID');
    localStorage.removeItem('deliveryID');
    localStorage.removeItem("order");
    localStorage.removeItem("selectedItem");
    localStorage.removeItem("vatamount");
    localStorage.removeItem("pureprice");
    localStorage.removeItem("totalprice");
    localStorage.removeItem("discount");
    this.reloadPage();
  }

  //==================== Culculations ====================
  pureprice!: number
  roundedvat: any
  roundedtotal: any
  public calculateTotalPrice(): any {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += item.stock_Item.stock_Item_Price * item.basket_Quantity;
      //localStorage.setItem('quantity', JSON.stringify(item.basket_Quantity));
    }
    this.pureprice = totalPrice
    //localStorage.setItem('pureprice', JSON.stringify(pureprice));
    localStorage.setItem('pureprice', this.pureprice.toString());

    this.vatprice = (totalPrice * 0.15)
    this.roundedvat = this.vatprice.toFixed(2)
    //localStorage.setItem('vatamount', JSON.stringify(this.vatprice));
    localStorage.setItem('vatamount', this.vatprice.toString());

    totalPrice = totalPrice + this.vatprice - this.discount_Amount
    this.roundedtotal = totalPrice.toFixed(2)
    this.order.price = totalPrice;
    return this.roundedtotal;
  }
  //Discount 
  discounts: Discount = new Discount()
  discount_Amount: number = 0
  CheckDiscount() {
    this.cartItems.forEach(item => {
      this.discountservice.GetDiscountByStock(item.stock_Item.stock_Item_ID).subscribe(result => {
        this.discounts = result as Discount
        this.discount_Amount += this.discounts.discount_Amount
        console.log(this.discount_Amount)
        localStorage.setItem('discount', JSON.stringify(this.discount_Amount));
      })

    });
  }

  //==================== Make Payment ====================
  public makepayment() {
    try {
      //const existingItem = localStorage.getItem('cart');
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

      this.CheckPersonalised();
    }
    catch {

    }


    // if (!this.CheckPersonalised()) {
    //   try {

    //   } 
    //   catch 
    //   {


    //this.uploadImage();
    //this.UploadPersonalisation();
    //change to checkout and go to deliveries then make payment 
    //this.AddImageToImageLineItem() 
    // this.AddPersonalisation()
    //this._router.navigate(["/tabs/make-payment"])
    // }
    // }
  }

  //==================== Checks ====================
  CheckPersonalised() {
    //let personalised = JSON.parse(JSON.stringify(localStorage.getItem('personalisedID')));

    let cartItems = JSON.parse(localStorage.getItem('cart') as string);

    console.log("Items " + cartItems.length)

    let total = 0;

    for (let i = 0; i < cartItems.length; i++) {
      if (this.isEmptyObject(cartItems[i].personalization)) {
        this.PleasePersonalizeAlert();
        total += 1;
      }
    }

    if (total == 0) {
      this.CheckUser();
    }
    
    /*let personalised = JSON.parse(JSON.stringify(localStorage.getItem('stockId')));
    if (personalised == null) {  //  [==="User"]
      this.PleasePersonalizeAlert()
      return false;
    }
    else {
      this.CheckUser()
      return true;
    }*/
  }

  CheckUser() {
    this.user = JSON.parse(JSON.stringify(localStorage.getItem('roles')));
    if (this.user === "User") {  //  [==="User"]
      //Action Trail
      this.action = "Checked out cart"
      this.AddAuditTrail()
      this._router.navigate(['./tabs/make-payment']);
    }
    else {
      this._router.navigate(['./tabs/login']);
    }
  }

  //==================== Personalise ====================
  personalizations!: Personalisation_Design;
  fileNameUploaded = '';
  formData = new FormData();

  uploadedImage!: Design_Image;
  uploadedText!: Design_Text;
  isModalOpen = false;

  AddTextForm: FormGroup = new FormGroup({
    designText: new FormControl('', [Validators.required])
  });

  UploadImageForm: FormGroup = new FormGroup({
    designImage: new FormControl('', [Validators.required])
  });

  //opens add modal
  public personalize(id: any, isOpen: boolean) {
    localStorage.setItem("stockId", id);
    this.isModalOpen = isOpen;
  }

  canceladdmodal() {
    localStorage.removeItem("stockId");
    this.modal.dismiss(null, 'cancel');
  }

  /*confirmaddmodal() {
    try{     

      //Upload to backend
      this.uploadImage();
    }
    catch{
      this.addPersonalizationErrorAlert()
    }
  }*/

  uploadFile = (files: any) => {
    let fileToUpload = <File>files[0];
    this.formData.append('file', fileToUpload, fileToUpload.name);
    this.fileNameUploaded = fileToUpload.name

    /****STORING THE IMAGE URL IN THE LOCAL STORAGE****/
    if (fileToUpload) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        localStorage.setItem("Image-URL", reader.result as string);
      });

      reader.readAsDataURL(fileToUpload);
      console.log('File to upload', fileToUpload)
    }
  }

  uploadImage() {
    this.service.UploadDesignImage(this.formData).subscribe(result => {
      this.uploadedImage = result as Design_Image
      //this.imageID = this.uploadedImage.design_Image_ID
      console.log('Image API', this.uploadedImage)
      this.uploadText()
    },
      (error) => {
        this.addPersonalizationErrorAlert()
        console.error('Upload error:', error);
      })

  }

  uploadText() {
    let addedtext = new Design_Text()
    addedtext.design_Text_Description = this.AddTextForm.value.designText
    this.service.UploadDesignText(addedtext).subscribe(res => {
      this.uploadedText = res as Design_Text
      //this.textID = this.uploadedText.design_Text_ID
      console.log('Text API', this.uploadedText)
      this.UploadPersonalisation()
    },
      (error) => {
        this.addPersonalizationErrorAlert()
        console.error('Upload error:', error);
      })

  }

  UploadPersonalisation() {
    let personalisation = new PersonalisationDesignVM()
    //if (personalisation) {
    let stockId = localStorage.getItem("stockId");
    //personalisation.design_Text = this.AddTextForm.get("designText")?.value;
    //personalisation.image_File = this.UploadImageForm.get("designImage")?.value;

    personalisation.design_Text_ID = this.uploadedText.design_Text_ID //this.textID
    personalisation.design_Image_ID = this.uploadedImage.design_Image_ID //this.imageID
    personalisation.stock_Item_ID = JSON.parse(JSON.stringify(localStorage.getItem('stockId')));
    console.log(personalisation)

    this.service.AddPersonalisation(personalisation).subscribe(res => {
      this.personalizations = res as Personalisation_Design
      let personalisedID = this.personalizations.personalisation_Design_ID
      localStorage.setItem('personalisedID', JSON.stringify(personalisedID));

      console.log('Both', personalisation);
      /*this.AddPersonalisationToCart()*/
      //this.addPersonalizationSuccessAlert()

      //Action Trail
      this.action = "Personalised Item:" //+ items.stock_Item.stock_Item_Name
      this.AddAuditTrail()
    },
      (error) => {
        this.addPersonalizationErrorAlert()
        console.error('Upload error:', error);
      })
    //}
  }

  /*AddPersonalisationToCart() {
    try{
      let stockId = localStorage.getItem("stockId");

      let items = JSON.parse(localStorage.getItem('cart') as string) || [];
      let existingItem: BasketItems = items.find((cartItem: any) => cartItem.stock_Item.stock_Item_ID === stockId);
  
      let design_Text = this.AddTextForm.get('designText')?.value;
      let image_File = this.UploadImageForm.get("designImage")?.value;
      let personalisationID = this.personalizations.personalisation_Design_ID
      if (existingItem) {
        //items.push({ ...existingItem, personalization. : 1 });
        existingItem.personalization.personalizationText = design_Text;
        existingItem.personalization.img = image_File;
        existingItem.personalization.personalisation_ID = personalisationID;
        console.log('LocalStorage cart', existingItem)
      }
      localStorage.setItem('cart', JSON.stringify(items));

      this.addPersonalizationSuccessAlert()
    }
    catch{
      this.addPersonalizationErrorAlert()
    }
    
  }*/

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
      localStorage.removeItem("stockId");
      //console.log('LocalStorage cart', existingItem)
    }
    localStorage.setItem('cart', JSON.stringify(items));
    //this.uploadImage();
    //this.UploadPersonalisation();
    this.addPersonalizationSuccessAlert();

    //Action Trail
    this.action = "Personalised Item:" + items.stock_Item.stock_Item_Name
    this.AddAuditTrail()
  }


  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    this.isModalOpen = false;
  }

  // public update(id: any, isOpen: boolean) {
  //   localStorage.setItem("stockId", id);
  //   this.isModalOpen = isOpen;
  // }


  //==================== Audit Trail ====================
  action!: string
  AddAuditTrail() {
    let customer_ID = JSON.parse(JSON.stringify(localStorage.getItem('customerID')))
    let audittrail = new AuditTrail()
    audittrail.customer_ID = customer_ID
    audittrail.actionName = this.action

    this.auditservice.AddCustomerAuditTrail(audittrail).subscribe(result => {
      console.log(result)
    })
  }


  //==================== Alerts ====================
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
      subHeader: 'Ensure that all your items in the basket are personalized.',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        /*handler: () => {
          this.reloadPage();
        }*/
      }],
    });
    await alert.present();
  }

  async PersonalisationTip() {
    const alert = await this.alertController.create({
      header: 'Please note:',
      subHeader: 'We do require a jpeg inspiration photo and text description to fulfil your order',
      message: 'If you are having issues with personalising your orderd please contact us on our contact us page.',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          this.reloadPage();
        }
      }, {
        text: 'Contact Us',
        //role: 'cancel',
        handler: () => {
          this.ContactUs();
        }
      }],
    });
    await alert.present();
  }

}


// AddForm: FormGroup = new FormGroup({
//   designText: new FormControl('', [Validators.required]),
//   designImage: new FormControl('', [Validators.required])
// });

//confirm add modal
// let items = JSON.parse(localStorage.getItem('cart') as string) || [];
// let existingItem:BasketItems = items.find((cartItem:any) => cartItem.stock_Item.stock_Item_ID === stockId);

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
