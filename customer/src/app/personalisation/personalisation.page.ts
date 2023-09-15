import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, AlertController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, } from '@angular/forms';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PersonalisationService } from '../Services/personalisation.service';
import { PersonalisationDesignVM } from '../ViewModels/personalisationdesignVM';
import { Design_Image } from '../Models/designimage';
import { Design_Text } from '../Models/designtext';
//for modal
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-personalisation',
  templateUrl: './personalisation.page.html',
  styleUrls: ['./personalisation.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class PersonalisationPage implements OnInit {
  imageformdata = new FormData();
  @ViewChild(IonModal) modal!: IonModal;
  personalizations: PersonalisationDesignVM[] = [];
  fileNameUploaded = ''
  uploadedImage: Design_Image[] = [];
  text: Design_Text[] = [];

  selectedItem: any;


  constructor(private _router: Router, private service: PersonalisationService, private fb: FormBuilder
    , private alertController: AlertController, private _modalController: ModalController, private route: ActivatedRoute) { }

  AddForm: FormGroup = new FormGroup({
    designText: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    const itemParam = this.route.snapshot.queryParamMap.get('item');
    if (itemParam) {
      this.selectedItem = JSON.parse(itemParam);
      try {
        localStorage.setItem('selectedItem', JSON.stringify(this.selectedItem));
      } catch {
        console.log('error', Error)
      }

    }

  }

  DeletePersonalisation(selectedItem: any): void {
    try {
      const data = localStorage.getItem('cart') as string;
      //const selectedItemLocal=localStorage.getItem('selectedItem') as string;
      selectedItem = localStorage.getItem('selectedItem') || [];
      //const selectedItemLocal = JSON.parse(localStorage.getItem('selectedItem')as string) || [];
      /*const itemArray = [
        {  'personalization': selectedItemLocal.personalization ,
        'stock_Item': selectedItemLocal.stock_Item ,
       'basket_Quantity': selectedItemLocal.basket_Quantity }
      ];*/
      //console.log('selectedItem',selectedItemLocal)

      // console.log('data',data)
      if (selectedItem) {
        const dataArray = JSON.parse(data);
        console.log('arrayParsed', dataArray)
        const design = JSON.parse(selectedItem)
        //const design= JSON.parse(itemArray)
        console.log('design', design)
        const update = design.filter((design: any) => design.personalization !== dataArray[0].personalization);
        localStorage.setItem('cart', JSON.stringify(update));
        console.log('update', update)
      }
      else {
        //this.data = [];
        console.log('error')
      }

    }
    catch {
    }

    /*try {
      const myArrayDataString = localStorage.getItem('cart');

      if (myArrayDataString !== null) {

        // If the data is not null, parse it into an array
        const myArrayData = JSON.parse(myArrayDataString);
        console.log('before', myArrayData)

        // Find the index of the item to delete (replace 'itemToDelete' with the actual item you want to delete)
        const indexToDelete = myArrayData.findIndex((item: { personalization: Personalization; })=> item.personalization === id);
        console.log('index', indexToDelete)

        // Check if the item was found (index is not -1)
        if (indexToDelete !== -1) {
          // Remove the item from the array
          myArrayData.splice(indexToDelete, 1);

          // Now, 'myArrayData' no longer contains the deleted item
          // Update 'myArrayData' in localStorage
          localStorage.setItem('myArrayData', JSON.stringify(myArrayData));
          console.log('update', myArrayData)
        }
      }

    } catch { console.log('error') }*/

    /*const data =JSON.parse(localStorage.getItem("cart"));
    if(data!==null){
      const storedData = JSON.parse(data);
    
      // Perform the search using Array.find() or a for loop
      if (Array.isArray(storedData)) {
        // Find the object with the matching personalizationText
        const foundItemIndex = storedData.findIndex(item => item.personalization.personalizationText === selectedItem.personalizationText);
    
        if (foundItemIndex !== -1) {
          // Get a reference to the object with the matching personalizationText
          const foundItem = storedData[foundItemIndex];
    
          // Delete the personalization property within the object
          delete foundItem.personalization;
    
          // Store the updated array back in local storage
          localStorage.setItem("cart", JSON.stringify(storedData));
    
          console.log("Personalization object deleted from the item.");
        } else {
          // No matching object was found
          console.log("Item not found");
        }
      } else {
        // Handle the case where storedData is not an array
        console.log("Data in local storage is not an array");
      }
      } else {
        // Handle the case where storedData is not an array
        console.log("Data in local storage is not an array");
      }*/

  }

  public basket() {
    this._router.navigate(["/tabs/basket"])
  }

  reloadPage() {
    window.location.reload()
  }

  canceladdmodal() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmaddmodal() {
    // this.UpdatePersonalisation();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }


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




  // GetPersonalisation() {

  //   this.service.GetPersonalisation().subscribe(result => {
  //     this.personalizations = result as PersonalisationDesignVM[];
  //     console.log(this.personalizations)
  //   })
  // }

  /*AddPersonalisation() {
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
  }*/

  /*UpdatePersonalisation(personalisation_Design_ID: number) {
    this._router.navigate(['/edit-personalization', personalisation_Design_ID]);
  }*/

  /*DeletePersonalisation(personalisation_Design_ID: string) {

    /*this.service.DeletePersonalisation(personalisation_Design_ID).subscribe(result => {
      console.log(result);
      if (result.status == "Error") {
        this.DeletePersonalizationErrorAlert();
      }
      else if (result.status == "Success") {
        this.DeletePersonalizationSuccessAlert();
      }
    })
  }*/







}
