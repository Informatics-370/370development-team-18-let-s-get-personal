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
import { AuditTrailService } from 'src/app/Services/audittrail.service';
import { AuditTrail } from 'src/app/Models/adittrail';
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
  action!: string

  constructor(public modalCtrl: ModalController, private service:StockImageDataService,
    private router: Router, private alertController: AlertController, private route:ActivatedRoute,
    private trailservice: AuditTrailService) 
  { }

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

  deleteStockImage(stock_Image_ID:string, stock_Image_Name:string){
    this.service.DeleteStockImage(stock_Image_ID).subscribe(result =>{
      this.action = "Deleted Stock Image: " + stock_Image_Name

      this.AddTrail()
      this.DeleteStockImageSuccessAlert()
    },(error) => {
      this.DeleteStockImageSuccessAlert();        
      console.error('Delete stock image error:', error);
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
    this.formData.append('name', this.editForm.get('name')!.value);
    this.service.UpdateStockImage(this.editImage.stock_Image_ID, this.formData).subscribe(result =>{
      this.action = "Edited Stock Image From "+ this.editImage.stock_Image_Name + " To: " + this.editForm.value.name
      this.AddTrail()

      this.editSuccessAlert();
    },(error) => {
      this.editErrorAlert();        
      console.error('Edit stock image error:', error);
    })         
  }

  canceleditmodal() {
    this.isModalOpen = false;
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  AddTrail(){
    let audittrail = new AuditTrail()
    let roles = JSON.parse(JSON.stringify(localStorage.getItem('roles'))); //userID
    let userID = JSON.parse(JSON.stringify(localStorage.getItem('userID'))) //JSON.parse(localStorage.getItem('userID') as string)

    
    if(roles == "Admin"){
      audittrail.admin_ID = userID
      audittrail.actionName = this.action
      this.trailservice.AddAdminAuditTrailItem(audittrail).subscribe(result =>{
        console.log(result)
      },(error) => {
        //this.editErrorAlert();        
        console.error('Audit trail error:', error);
      })
    }
    else{
      audittrail.employee_ID = userID
      audittrail.actionName = this.action
      this.trailservice.AddEmployeeAuditTrail(audittrail).subscribe(result =>{
        console.log(result)
      },(error) => {
        //this.editErrorAlert();        
        console.error('Audit trail error:', error);
      })
    }
  }

  //========= Alerts =====
  async HelpAlert() {
    const alert = await this.alertController.create({
      header: 'Please Note: ',
      subHeader: 'You are required to add the product image while adding a product',
      message: 'Images cannot be deleted if they are being used in a product',
      buttons: [{
          text: 'OK',
          role: 'cancel',
      }],
    });
    await alert.present();
  }

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
      message: 'Please note we cannot delete images that are being used in a product',
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

  // uploadFile = (files: any) => {
  //   let fileToUpload = <File>files[0];
    
  //   // Check if the file is an image (you can extend this check with more image types)
  //   if (fileToUpload.type.startsWith('image/')) {
  //     this.formData.append('file', fileToUpload, fileToUpload.name);
  //     this.fileNameUploaded = fileToUpload.name;
  //   } else {
  //     // Display an error message or handle the non-image file as needed
  //     this.fileNameUploaded = 'Invalid file type. Please choose an image file.';
  //   }
  // }  

  // addStockImage(){
  //   //if(this.AddImageForm.valid)
  //   //{
  //     this.formData.append('name', this.AddImageForm.get('name')!.value);
  //     this.service.AddStockImage(this.formData).subscribe(result => {
  //       if(result == null){
  //         this.AddStockImageErrorAlert()
  //       }
  //       else{
  //         this.action = "Added Stock Image: " + this.AddImageForm.value.name
  //         this.AddTrail()
  //         this.AddStockImageSuccessAlert() 
  //       }
  //     })         
  // }
  
  // canceladdImagemodal() {
  //   this.modal.dismiss(null, 'cancel');
  // }

  // confirmaddImagemodal() {
  //   this.addStockImage();    
  // }