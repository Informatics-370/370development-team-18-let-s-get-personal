import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, AlertController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, } from '@angular/forms';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PersonalisationService } from '../Services/personalisation.service';
import { Personalisation_Design } from '../Models/personalisationdesign';
import { PersonalisationDesignVM } from '../ViewModels/personalisationdesignVM';
import { TextPrice } from '../Models/textprice';
//for modal
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';


@Component({
  selector: 'app-personalisation',
  templateUrl: './personalisation.page.html',
  styleUrls: ['./personalisation.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule,RouterModule]
})
export class PersonalisationPage implements OnInit {
  imageformdata = new FormData();
  personalizations: PersonalisationDesignVM[] = [];
  fileNameUploaded = ''
  @ViewChild(IonModal) modal!: IonModal;
  errmsg: string = ""
  textprice: TextPrice[] =[]
  imageprice: any //Image_Price[] =[]
  imagepriceID!: string

  //personalizations: Personalisation_Design[] = [];
  //@ViewChild(IonModal) modal!: IonModal;

  constructor(private _router: Router, private service: PersonalisationService, private fb: FormBuilder
    , private alertController: AlertController, private _modalController: ModalController) { }

  AddForm: FormGroup = new FormGroup({
    designText: new FormControl('', [Validators.required])
  })

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

/*this.service.AddPersonalisation(this.formData).subscribe(result => {
      if(result.status == "Error"){        
        this.addPersonalizationErrorAlert();
      }
      else if(result.status == "Success"){
        this.addPersonalizationSuccessAlert();
      }
    })*/
    
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
  ngOnInit(): void {
    this.GetPersonalisation()
  }

  GetPersonalisation() {

    this.service.GetPersonalisation().subscribe(result => {
      this.personalizations = result as PersonalisationDesignVM[];
      console.log(this.personalizations)
    })
  }

  AddPersonalisation() {
    let AddPersonalisation = new PersonalisationDesignVM();

    // AddPersonalisation.design_Text.design_Text_Description = this.AddForm.value.designText;
    // AddPersonalisation.design_Image=this.AddForm.value.design_Image;

    this.service.AddPersonalisation(AddPersonalisation).subscribe(response => {
      if (response.status == "Error") {
        this.addPersonalizationErrorAlert();
      }
      else {
        this.addPersonalizationSuccessAlert();
      }
    })
  }

  UpdatePersonalisation(personalisation_Design_ID: number) {
    this._router.navigate(['/edit-personalization', personalisation_Design_ID]);
  }

  DeletePersonalisation(personalisation_Design_ID: string) {
    this.service.DeletePersonalisation(personalisation_Design_ID).subscribe(result => {
      console.log(result);
      if (result.status == "Error") {
        this.DeletePersonalizationErrorAlert();
      }
      else if (result.status == "Success") {
        this.DeletePersonalizationSuccessAlert();
      }
    })
  }

  public basket() {
    
   // this.AddImageToImageLineItem()
    this._router.navigate(["/tabs/basket"]) //----- change to delivery details
  }

  reloadPage() {
    window.location.reload()
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



  async DeletePersonalizationSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Your Design is successfully deleted!',
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

  async DeletePersonalizationErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Your Design Was Unfortunately Not Deleted.',
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
