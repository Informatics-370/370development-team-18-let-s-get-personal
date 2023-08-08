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

  uploadFile = (files: any) => {
    let fileToUpload = <File>files[0];
    this.formData.append('file', fileToUpload , fileToUpload.name); //
    this.fileNameUploaded = fileToUpload.name
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

  EditStockImage(stock_Image_ID:number){
    this.router.navigate(['./editStockImage',stock_Image_ID]);
  }

  deleteStockImage(stock_Image_ID:number){
    this.service.DeleteStockImage(stock_Image_ID).subscribe(result =>{
      if(result.status == "Error") {
        this.DeleteStockImageErrorAlert();
      }
      else if(result.status == "Success"){
        this.DeleteStockImageSuccessAlert();
      }         
    });
  }

  canceladdImagemodal() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmaddImagemodal() {
    this.addStockImage();    
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
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
