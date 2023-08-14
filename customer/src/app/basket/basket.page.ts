import { Component, EventEmitter, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { BasketItems } from '../Models/basket';
import { BasketService } from '../Services/basket.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Stock_Item } from '../Models/stockitem';
import { PersonalisationService } from '../Services/personalisation.service';
import { Personalisation_Design } from '../Models/personalisationdesign';
<<<<<<< Updated upstream
//import { Customer } from '../Models/customer';
=======
import { PersonalisationDesignVM } from '../ViewModels/personalisationdesignVM';
import { TextPrice } from '../Models/textprice';
>>>>>>> Stashed changes

//for modal

import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Design_Image } from '../Models/designimage';
import { Design_Text } from '../Models/designtext';
import { Image_Price } from '../Models/imageprice';
import { Design_Image_Line_Item } from '../Models/designimagelineitem';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule, RouterModule]
})
export class BasketPage implements OnInit {
uploadFile(arg0: FileList|null) {
throw new Error('Method not implemented.');
}

  imageformdata = new FormData();
  personalizations: PersonalisationDesignVM[] = [];
  fileNameUploaded = ''
  formData = new FormData();
  
  errmsg: string = ""
  textprice: TextPrice[] =[]
  imageprice: any //Image_Price[] =[]
  imagepriceID!: string

  @ViewChild(IonModal) modal!: IonModal
  constructor(private basketservice: BasketService, public modalCtrl: ModalController,
    private _router: Router,
    private service: PersonalisationService, private alertController: AlertController) { }

<<<<<<< Updated upstream
  personalizations: Personalisation_Design[] = [];

  basketItems: BasketItems[] = [];
  //customers:Customer[]=[];
=======
  personalisation: PersonalisationDesignVM[] = [];
>>>>>>> Stashed changes
  cartItems: any[] = [];

  AddForm: FormGroup = new FormGroup({
    designText: new FormControl('', [Validators.required])
  })
  UploadImage: FormGroup = new FormGroup({
    Image_File: new FormControl('')
  })



  ngOnInit() {
    this.cartItems = JSON.parse(localStorage.getItem('cart') as string) || [];
  }

<<<<<<< Updated upstream
  private basketItemList: BasketItems[];

=======
  uploadImage(){
    let designimage = new Design_Image()
    this.imageformdata.append('Image_File', this.UploadImage.get('Image_File')!.value);
>>>>>>> Stashed changes

    this.service.UploadDesignImage(this.imageformdata).subscribe(result => {
      designimage = result as Design_Image;
    })
    localStorage.setItem('designimageID', designimage.design_Image_ID);
  }

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
  }

  

  public removeItemFromBasket(id: any):void {
    this.cartItems = this.cartItems.filter((cartItem) => cartItem.stock_Item.stock_Item_ID !== id);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  public async incrementQuantity(item: any){
    
    if (item.basket_Quantity< 10) {
      item.basket_Quantity++;
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
    }
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  public calculateTotalPrice(): any {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += item.stock_Item.stock_Item_Price * item.basket_Quantity;
    }
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
<<<<<<< Updated upstream

    this._router.navigate(["/tabs/personalisation"])
=======
    //this._router.navigate(["/tabs/personalisation"], id)
>>>>>>> Stashed changes
  }



  public makepayment() {
<<<<<<< Updated upstream
    this._router.navigate(["/tabs/make-payment"])
  }

  AddPersonalisation() {
    let AddPersonalisation = new Personalisation_Design();

    AddPersonalisation.design_Text.design_Text_Description = this.AddForm.value.designText;
    AddPersonalisation.design_Image = this.AddForm.value.design_Image;
=======
    //change to checkout and go to deliveries then make payment 
    this.AddImageToImageLineItem()
   // this.AddPersonalisation()
    this._router.navigate(["/tabs/make-payment"])
  }

  /*AddPersonalisation() {
    let AddPersonalisation = new PersonalisationDesignVM();

     AddPersonalisation.design_Text = this.AddForm.value.designText;
     AddPersonalisation.image_File = this.AddForm.value.imageFile;
>>>>>>> Stashed changes

    this.service.AddPersonalisation(AddPersonalisation).subscribe(response => {
      if (response.status == "Error") {
        this.addPersonalizationErrorAlert();
      }
      else {
        this.addPersonalizationSuccessAlert();
      }
    })
  }*/


  AddPersonalisation() {
    let AddPersonalisation = new PersonalisationDesignVM();
//let token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
     AddPersonalisation.design_Text = this.AddForm.value.designText;
     AddPersonalisation.image_File = this.UploadImage.value.imageFile;
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
    let stockId=localStorage.getItem("stockId");

   let items = JSON.parse(localStorage.getItem('cart') as string) || [];
   let existingItem:BasketItems = items.find((cartItem:any) => cartItem.stock_Item.stock_Item_ID === stockId);
  
  let design_Text = this.AddForm.value.designText;
  let image_File = this.UploadImage.value.imageFile;

  if(existingItem){
    //items.push({ ...existingItem, personalization. : 1 });
    existingItem.personalization.personalizationText=design_Text;
    existingItem.personalization.img=image_File;
    localStorage.removeItem("stockId");
  }
  localStorage.setItem('cart',JSON.stringify(items));
  this._router.navigate(["/tabs/personalisation"])
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  async UploadErrorAlert() {
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
  }

  /*==============================================================================================*/
/*
  @ViewChild('canvas') canvas: any;
  context!: CanvasRenderingContext2D;
  customText: string = '';
  selectedFont: string = 'Arial';
  textColor: string = '#000000';
  private textX: number = 50;
  private textY: number = 150;
  private isDragging: boolean = false;
  private dragStartX: number = 0;
  private dragStartY: number = 0;
  private itemImage: HTMLImageElement | null = null;
  rotationAngle: number = 0;
  textXOffset: number = 0;
  textYOffset: number = 0;
  textSize: number = 30;
  customImageWidth: number = 100; // Default width of the custom image (adjust as needed)
  customImageHeight: number = 100;
  customImage: HTMLImageElement | null = null;
  private customImageX: number = 0;
  private customImageY: number = 0;
  imgXOffset: number = 0;
  imgYOffset: number = 0;
  private isTextDragging: boolean = false;
  private isImageDragging: boolean = false;
   customImageContext!: CanvasRenderingContext2D;

ngAfterViewInit(){
  this.context = this.canvas.nativeElement.getContext('2d');
  this.customImageContext = this.canvas.nativeElement.getContext('2d');
  //this.loadCustomFont();
  this.canvas.nativeElement.addEventListener('mousedown', this.onCanvasMouseDown.bind(this));
  this.canvas.nativeElement.addEventListener('mousemove', this.onCanvasMouseMove.bind(this));
  this.canvas.nativeElement.addEventListener('mouseup', this.onCanvasMouseUp.bind(this));
  this.canvas.nativeElement.addEventListener('touchstart', this.onCanvasTouchStart.bind(this));
  this.canvas.nativeElement.addEventListener('touchmove', this.onCanvasTouchMove.bind(this));
  this.canvas.nativeElement.addEventListener('touchend', this.onCanvasTouchEnd.bind(this));
}
onCanvasMouseDown(event: MouseEvent | TouchEvent) {
  this.isDragging = true;
  this.dragStartX = this.getClientX(event);
  this.dragStartY = this.getClientY(event);
}

onCanvasMouseMove(event: MouseEvent | TouchEvent) {
  if (this.isDragging) {
    const offsetX = this.getClientX(event) - this.dragStartX;
    const offsetY = this.getClientY(event) - this.dragStartY;

    // Update the position of the custom image
    if (this.customImage) {
      this.customImageX += offsetX;
      this.customImageY += offsetY;
    }

    // Update the position of the text
    this.textX += offsetX;
    this.textY += offsetY;

    this.dragStartX = this.getClientX(event);
    this.dragStartY = this.getClientY(event);
    this.applyChanges();
  }
}

onCanvasMouseUp() {
  this.isDragging = false;
}

// Touch events for mobile support
onCanvasTouchStart(event: TouchEvent) {
  const touchX = this.getClientX(event);
  const touchY = this.getClientY(event);

  // Check if the touch is within the bounds of the custom image
  if (
    touchX >= this.customImageX && touchX <= this.customImageX + this.customImageWidth &&
    touchY >= this.customImageY && touchY <= this.customImageY + this.customImageHeight
  ) {
    // Start dragging the custom image
    this.isImageDragging = true;
    this.imgXOffset = touchX - this.customImageX;
    this.imgYOffset = touchY - this.customImageY;
    // Ensure text dragging is disabled
    this.isTextDragging = false;
  } else {
    // Start dragging the text
    this.isTextDragging = true;
    this.dragStartX = touchX - this.textX;
    this.dragStartY = touchY - this.textY;
    // Ensure custom image dragging is disabled
    this.isImageDragging = false;
  }
}


onCanvasTouchMove(event: TouchEvent) {
  if (this.isImageDragging) {
    const touchX = this.getClientX(event);
    const touchY = this.getClientY(event);

    // Update the position of the custom image
    this.customImageX = touchX - this.imgXOffset;
    this.customImageY = touchY - this.imgYOffset;

    this.applyChanges();
  } else if (this.isTextDragging) {
    const touchX = this.getClientX(event);
    const touchY = this.getClientY(event);

    const offsetX = touchX - this.dragStartX;
    const offsetY = touchY - this.dragStartY;

    // Update the position of the text
    this.textX = offsetX;
    this.textY = offsetY;

    this.applyChanges();
  }
}


onCanvasTouchEnd() {
  this.isDragging = false;
  this.isTextDragging = false;
}

// Helper function to get the client X coordinate for both events
getClientX(event: MouseEvent | TouchEvent): number {
  if ('touches' in event) {
    return event.touches[0].clientX;
  } else {
    return event.clientX;
  }
}

// Helper function to get the client Y coordinate for both events
getClientY(event: MouseEvent | TouchEvent): number {
  if ('touches' in event) {
    return event.touches[0].clientY;
  } else {
    return event.clientY;
  }
}

applyChanges() {
  // Check if the font is loaded before applying changes

  this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

  // Draw the image first (assuming you have a variable named 'itemImage' containing the loaded image)
  if (this.itemImage) {
    this.context.drawImage(this.itemImage, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  if (this.itemImage) {
    this.drawCustomImage(); // Draw the custom image at its position
  }

  this.drawCustomText(); // Draw the text at its position
}

handleImageUpload(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e: any) => {
    const img = new Image();
    img.onload = () => {
      this.itemImage = img;
      this.applyChanges(); // Redraw the text on top of the image
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

rotateText() {
  this.rotationAngle += 45; // Rotate the text by 45 degrees clockwise
  this.applyChanges(); // Reapply changes to update the canvas
}

saveCustomizedImage() {
  // Create a new canvas to hold the customized image
  const imageCanvas = document.createElement('canvas');
  imageCanvas.width = this.canvas.nativeElement.width;
  imageCanvas.height = this.canvas.nativeElement.height;
  const imageContext = imageCanvas.getContext('2d');

  if (!imageContext) {
    console.error('Canvas context is null.');
    return;
  }

  // Draw the item image on the new canvas if available
  if (this.itemImage) {
    imageContext.drawImage(this.itemImage, 0, 0, imageCanvas.width, imageCanvas.height);
  }

  // Draw the custom image on the new canvas if available
  if (this.customImage) {
    imageContext.save();
    imageContext.translate(this.customImageX + this.customImageWidth, this.customImageY + this.customImageHeight);
    imageContext.rotate((this.rotationAngle * Math.PI) / 180);
    imageContext.drawImage(this.customImage, -this.customImageWidth, -this.customImageHeight, this.customImageWidth, this.customImageHeight);
    imageContext.restore();
  }

  // Draw the custom text on the new canvas
  imageContext.save();
  imageContext.translate(this.textX, this.textY);
  imageContext.rotate((this.rotationAngle * Math.PI) / 180);
  imageContext.font = `${this.textSize}px ${this.selectedFont}`;
  imageContext.fillStyle = this.textColor;
  imageContext.fillText(this.customText, 0, 0);
  imageContext.restore();

  // Convert the canvas content to an image URL
  const imageURL = imageCanvas.toDataURL('image/png');

  // Create an anchor element to initiate the download
  const downloadLink = document.createElement('a');
  downloadLink.href = imageURL;
  downloadLink.download = 'customized_image.png';

  // Simulate a click on the anchor element to trigger the download
  downloadLink.click();
}


handleCustomImageUpload(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e: any) => {
    const img = new Image();
    img.onload = () => {
      this.customImage = img;
      this.applyChanges(); // Redraw the canvas with the custom image
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

drawCustomText() {
  this.context.save();
  this.context.translate(this.textX, this.textY);
  this.context.rotate((this.rotationAngle * Math.PI) / 180);
  this.context.font = `${this.textSize}px ${this.selectedFont}`;
  this.context.fillStyle = this.textColor;
  this.context.fillText(this.customText, 0, 0);
  this.context.restore();
}

drawCustomImage() {
  if (this.customImage) {
    this.customImageContext.save();
    this.customImageContext.translate(this.customImageX + this.customImageWidth / 2, this.customImageY + this.customImageHeight / 2);
    this.customImageContext.rotate((this.rotationAngle * Math.PI) / 180);
    this.customImageContext.drawImage(this.customImage, -this.customImageWidth / 2, -this.customImageHeight / 2, this.customImageWidth, this.customImageHeight);
    this.customImageContext.restore();
  }
}*/

}
