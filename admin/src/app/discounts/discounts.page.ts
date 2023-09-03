import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Discount } from 'src/app/Models/discount';
import { DiscountService } from 'src/app/Services/discount.service';
//for modal
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.page.html',
  styleUrls: ['./discounts.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class DiscountsPage implements OnInit {
  discounts:Discount[]=[];

  @ViewChild(IonModal) modal!: IonModal
  constructor(private service:DiscountService, private thisroute: Router, public modalCtrl: ModalController,
    private alertController:AlertController ) { }

  AddForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    amount: new FormControl('',[Validators.required]),
    effectiveFromdate: new FormControl('',[Validators.required]),
    effectiveTodate: new FormControl('',[Validators.required])
  })

  ngOnInit(): void {
    this.getDiscounts();
  }

  getDiscounts(){
    this.service.GetAllDiscounts().subscribe(result =>{
      this.discounts = result;
      console.log(this.discounts)
      
    })
  }

  AddDiscount(){
    let addDiscount = new Discount();

    addDiscount.discount_Name = this.AddForm.value.name;
    addDiscount.discount_Amount = this.AddForm.value.amount;
    addDiscount.effective_From_Date = this.AddForm.value.effectiveFromdate;
    addDiscount.effective_To_Date = this.AddForm.value.effectiveTodate;

    this.service.AddDiscount(addDiscount).subscribe(response => {
      if(response.status == "Error")
      {
        this.addDiscountErrorAlert();
      }
      else {
        this.addDiscountSuccessAlert();
      }
    })
  }

  isModalOpen = false;
  editDiscount: Discount = new Discount();
  editForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    amount: new FormControl('',[Validators.required]),
    effectiveFromdate: new FormControl('',[Validators.required]),
    effectiveTodate: new FormControl('',[Validators.required])
  })
  

  EditDiscount(discount_ID:string, isOpen: boolean)
  {    
    this.service.GetDiscount(discount_ID).subscribe(response => { 
        
      this.editDiscount = response as Discount;

      this.editForm.controls['name'].setValue(this.editDiscount.discount_Name);
      this.editForm.controls['amount'].setValue(this.editDiscount.discount_Amount);
      this.editForm.controls['effectiveFromdate'].setValue(this.editDiscount.effective_From_Date);
      this.editForm.controls['effectiveTodate'].setValue(this.editDiscount.effective_To_Date);
    })
    
    this.isModalOpen = isOpen;
  }

  confirmeditmodal(){
    try
    {
      let editedDiscount = new Discount();
      editedDiscount.discount_Name = this.editForm.value.name;
      editedDiscount.discount_Amount = this.editForm.value.amount;
      editedDiscount.effective_From_Date = this.editForm.value.effectiveFromdate;
      editedDiscount.effective_To_Date = this.editForm.value.effectiveTodate;

      this.service.UpdateDiscount(this.editDiscount.discount_ID, editedDiscount).subscribe(result =>{
        this.editDiscountSuccessAlert();
      })      
    }
    catch{      
      this.editDiscountErrorAlert();
    }    
  }

  async editDiscountSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Discount Updated',
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

  async editDiscountErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Discount Was Not Updated',
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

  DeleteDiscount(discount_ID: string){
    this.service.DeleteDiscount(discount_ID).subscribe(result => {
      console.log(result);
      if(result.status == "Error")
      {
        this.DeleteDiscountErrorAlert();
      }
      else if(result.status == "Success"){
        this.DeleteDiscountSuccessAlert();
      }
    })
  }

  reloadPage(){
    window.location.reload()
  }
  
  canceladdmodal() {
    this.modal.dismiss(null, 'cancel');
  }

  canceleditmodal() {
    this.isModalOpen = false;
    //this.modal.dismiss(null, 'cancel');
  }

  confirmaddmodal() {
    this.AddDiscount();    
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  async addDiscountSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Discount Added',
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

  async addDiscountErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Discount Was Not Added',
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

  async DeleteDiscountSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Discount Deleted',
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

  async DeleteDiscountErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Discount Was Not Deleted',
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
}
