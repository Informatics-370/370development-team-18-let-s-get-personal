import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
//for modal
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

import { Stock_Image } from 'src/app/Models/stockimage';
import { StockImageDataService } from 'src/app/Services/stockimage.service';

@Component({
  selector: 'app-stock-image',
  templateUrl: './stock-image.page.html',
  styleUrls: ['./stock-image.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class StockImagePage implements OnInit {
  formData = new FormData();
  @ViewChild(IonModal) modal!: IonModal
  stockimages: Stock_Image[] =[];
  fileNameUploaded = ''

  constructor(public modalCtrl: ModalController, private service:StockImageDataService,
    private router: Router, private alertController: AlertController, private route:ActivatedRoute) { }

  AddImageForm:FormGroup = new FormGroup({
    imagefile: new FormControl('',[Validators.required]),     
    name: new FormControl('',[Validators.required]), 
  });     

  ngOnInit(): void {
  this.GetStockImages();   
  }

  GetStockImages(){
    this.service.GetAllStockImages().subscribe(result =>{
      this.stockimages = result as Stock_Image[];
      console.log(this.stockimages);
    })    
  }

  inventoryNav()
  {
    this.router.navigate(['./tabs/inventory']);
  }

   /*uploadFile = (files: any) => {
 uploadFile = (files: any) => {
    let fileToUpload = <File>files[0];
    this.formData.append('file', fileToUpload , fileToUpload.name); //
    this.fileNameUploaded = fileToUpload.name
  }*/

  uploadFile = (files: any) => {
    let fileToUpload = <File>files[0];
    
    // Check if the file is an image (you can extend this check with more image types)
    if (fileToUpload.type.startsWith('image/')) {
      this.formData.append('file', fileToUpload, fileToUpload.name);
      this.fileNameUploaded = fileToUpload.name;
    } else {
      // Display an error message or handle the non-image file as needed
      this.fileNameUploaded = 'Invalid file type. Please choose an image file.';
    }
  }
  

  addStockImage(){
    //if(this.AddImageForm.valid)
    //{
      this.formData.append('name', this.AddImageForm.get('name')!.value);
      this.service.AddStockImage(this.formData).subscribe(result => {
        if(result.status == "Error"){        
          this.AddStockImageSuccessAlert();
        }
        else if(result.status == "Success"){
          this.AddStockImageSuccessAlert();
        }
      })
    //}          
  }
  
  canceladdImagemodal() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmaddImagemodal() {
    this.addStockImage();    
  }

  deleteStockImage(stock_Image_ID:string){
    this.service.DeleteStockImage(stock_Image_ID).subscribe(result =>{
      if(result.status == "Error") {
        this.DeleteStockImageErrorAlert();
      }
      else if(result.status == "Success"){
        this.DeleteStockImageSuccessAlert();
      }         
    });
  }

  //========= Edits =====
  isModalOpen = false;
  editImage: Stock_Image = new Stock_Image();
  editForm: FormGroup = new FormGroup({
    imagefile: new FormControl(''),     
    name: new FormControl(''),
  })

  uploadEditFile = (files: any) => {
    let fileToUpload = <File>files[0];
    this.formData.append('file', fileToUpload , fileToUpload.name); //
    this.fileNameUploaded = fileToUpload.name
  }

  EditImage(stock_Image_ID:string, isOpen: boolean)
  {
    this.service.GetStockImage(stock_Image_ID).subscribe(response => {         
      this.editImage = response as Stock_Image;
      this.editForm.controls['name'].setValue(this.editImage.stock_Image_Name);
      this.editForm.controls['imagefile'].setValue(this.editImage.stock_Image_File);
    })    
    this.isModalOpen = isOpen;
  }

  confirmeditmodal(){
    try
    {
      this.formData.append('name', this.editForm.get('name')!.value);

      this.service.UpdateStockImage(this.editImage.stock_Image_ID, this.formData).subscribe(result =>{
        this.editSuccessAlert();
      })      
    }
    catch{      
      this.editErrorAlert();
    }    
  }

  canceleditmodal() {
    this.isModalOpen = false;
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  //========= Alerts =====
  async editSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Image Updated',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler:() =>{
          this.reloadPage(); 
        }
    }],
    });
    await alert.present();
  }

  async editErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Image Was Not Updated',
      message: 'Please try again',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler:() =>{
          this.reloadPage(); //routeBack
        }
    }],
    });
    await alert.present();
  }
 
  async DeleteStockImageSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Stock Image Deleted',
      buttons: [{
          text: 'OK',
          role: 'cancel',
          handler:() =>{
            this.reloadPage();
          }
      }],
    });
    await alert.present();
  }  
  
  async DeleteStockImageErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Stock Image was not deleted',
      message: 'Please try again',
      buttons: [{
          text: 'OK',
          role: 'cancel',
          handler:() =>{
            this.reloadPage();
          }
      }],
    });
    await alert.present();
  }
  
  async AddStockImageSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Stock Image added',
      buttons: [{
          text: 'OK',
          role: 'cancel',
          handler:() =>{
            this.reloadPage();
          }
      }],
    });
    await alert.present();
  } 
  
  async AddStockImageErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Stock Image was not added',
      message: 'Please try again',
      buttons: [{
          text: 'OK',
          role: 'cancel',
          handler:() =>{
            this.reloadPage();
          }
      }],
    });
    await alert.present();
  }

  reloadPage(){
    window.location.reload()
  }
  
 
}
