import { Component, EventEmitter, OnInit, ViewChild,AfterViewInit } from '@angular/core';
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


//for modal

import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';



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

  formData = new FormData();
  @ViewChild(IonModal) modal!: IonModal
  personalizations: Personalisation_Design[] = [];
  fileNameUploaded = ''
  order = new OrderT();
  
  /*errmsg: string = ""
  textprice: TextPrice[] =[]
  imageprice: any //Image_Price[] =[]
  imagepriceID!: string*/

  
  constructor(private basketservice: BasketService, public modalCtrl: ModalController,
    private _router: Router,
    private service: PersonalisationService, private alertController: AlertController) { }

  cartItems: any[] = [];

  AddForm: FormGroup = new FormGroup({
    designText: new FormControl('', [Validators.required]),
    Image_File: new FormControl('')
  });
  

  ngOnInit() {
    this.cartItems = JSON.parse(localStorage.getItem('cart') as string) || [];
  }
 
  public removeItemFromBasket(id: any):void {
    this.cartItems = this.cartItems.filter((cartItem) => cartItem.stock_Item.stock_Item_ID !== id);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  public async incrementQuantity(item: any){
    
    if (item.basket_Quantity< 10) {
      item.basket_Quantity++;
      /*const counter=document.querySelector("#counter");
      if(counter){
        counter.innerHTML=item.basket_Quantity;
      }*/
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
    else{
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
     /* const counter=document.querySelector("#counter");
      if(counter){
        counter.innerHTML=item.basket_Quantity;
      }*/
    }
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  public calculateTotalPrice(): any {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += item.stock_Item.stock_Item_Price * item.basket_Quantity;
    }
    this.order.price=totalPrice;
    return totalPrice;
  }

  public clearBasket() {
    this.cartItems = this.cartItems.filter((cartItem) => cartItem.stock_Item_ID);
    localStorage.removeItem('cart');
  }

  public shopall() {
    this._router.navigate(["/tabs/shop-all"])
  }

  public personalize(id:any) {
    localStorage.setItem("stockId",id);
    //this.AddPersonalisation();
    this._router.navigate(["/tabs/personalisation"], id)
  }

  public makepayment() {

    const existingItem = localStorage.getItem('cart');
   let items = JSON.parse(localStorage.getItem('cart') as string)

   this.order.basketItems=items;
  
   this.order.paid=false;

   localStorage.setItem("order",JSON.stringify(this.order));

    console.log(items);

    //change to checkout and go to deliveries then make payment 
    //this.AddImageToImageLineItem()
   // this.AddPersonalisation()
    this._router.navigate(["/tabs/make-payment"])
  } 

 /*==============PERSONALIZATION===========================================*/ 
  
  /*uploadImage(){
    let designimage = new Design_Image()
    this.imageformdata.append('Image_File', this.UploadImage.get('Image_File')!.value);

    this.service.UploadDesignImage(this.imageformdata).subscribe(result => {
      designimage = result as Design_Image;
    })
    localStorage.setItem('designimageID', designimage.design_Image_ID);
  }*/
/*
  AddImageToImageLineItem(){
    let addtoline = new Design_Image_Line_Item();
    addtoline.image_Price_ID = this.imagepriceID
    //addtoline.design_Image_ID = get from local storage 

    this.service.AddToDesignImageLineItem(addtoline).subscribe(res =>{

    })
  }

  uploadDesignText(){
    let addDesignText = new Design_Text();
    addDesignText.design_Text_Description = this.AddForm.value.designText
    //text price 

    let newdesigntext = new Design_Text();
    this.service.UploadDesignText(addDesignText).subscribe(res =>{
      newdesigntext = res as Design_Text;
      localStorage.setItem('designtextID', newdesigntext.design_Text_ID);
    })
  }

  getTextPrice(){
    this.service.GetAllTextPrices().subscribe(result => {
      this.textprice = result as TextPrice[];
      console.log(this.textprice)
    })
  }

  getImagePrice(){
    this.service.GetAllImagePrices().subscribe(result => {
      this.imageprice = result as Image_Price[];
      console.log(this.imageprice)
    })
  }*/

  uploadFile = (files: any) => {
    let fileToUpload = <File>files[0];
    this.formData.append('file', fileToUpload , fileToUpload.name); //
    this.fileNameUploaded = fileToUpload.name
  }

  addPersonalization(){
    let stockId=localStorage.getItem("stockId");

    let items = JSON.parse(localStorage.getItem('cart') as string) || [];
    let existingItem:BasketItems = items.find((cartItem:any) => cartItem.stock_Item.stock_Item_ID === stockId);
   
   //let design_Text = this.AddForm.value.designText;
   //let image_File = this.UploadImage.value.imageFile;
 
   if(existingItem){
     //items.push({ ...existingItem, personalization. : 1 });
     //existingItem.personalization.personalizationText=design_Text;
     //existingItem.personalization.img=image_File;
     localStorage.removeItem("stockId");
   }
   //localStorage.setItem('cart',JSON.stringify(items));


    this.formData.append('designText', this.AddForm.get('designText')!.value);
    this.formData.append('designImage', this.AddForm.get('designImage')!.value);
    /*this.service.AddPersonalisation(this.formData).subscribe(result => {
      if(result.status == "Error"){        
        this.addPersonalizationErrorAlert();
      }
      else if(result.status == "Success"){
        this.addPersonalizationSuccessAlert();
      }
    })*/
  }


  canceladdmodal() {
    this.modal.dismiss(null, 'cancel');
    
  }

  confirmaddmodal() {

    let stockId=localStorage.getItem("stockId");

    let items = JSON.parse(localStorage.getItem('cart') as string) || [];
    let existingItem:BasketItems = items.find((cartItem:any) => cartItem.stock_Item.stock_Item_ID === stockId);

    let design_Text = this.AddForm.value.designText;
   let image_File = "Kamo";
 
   if(existingItem){
    //items.push({ ...existingItem, personalization. : 1 });
    existingItem.personalization.personalizationText=design_Text;
    existingItem.personalization.img=image_File;
    localStorage.removeItem("stockId");
  }
  localStorage.setItem('cart',JSON.stringify(items));

   /* try{
    this.addPersonalization(); 
    this._router.navigate(["/tabs/personalisation"])  
    }catch{
      this.addPersonalizationErrorAlert();
    }*/
     
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
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

  /*async UploadErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: '',
      message: this.errmsg,
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          this.reloadPage();
        }
      }],
    });
    await alert.present();
  }*/
}
 