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

  filterTerm: string = "";
  //====================
  discounts:any=Discount;
  filteredDiscount = this.discounts.filter((items: { discount_Name: string,discount_Amount:number,effective_From_Date: Date,effective_To_Date: Date; }) => 
  items.discount_Name.toLowerCase().includes(this.filterTerm.toLowerCase()));


  updateSearchResults() {
    this.filteredDiscount = this.discounts.filter((items: { name: string; }) =>
     items.name.toLowerCase().includes(this.filterTerm.toLowerCase()));
  }

  //======================
  filtereddiscounts:  Discount[] = [];
  //discounts: Discount[] =[]
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
    if(this.filterTerm==""){
      this.filtereddiscounts = this.discounts;
    }
  }

 /* search(){
    //empty array
    this.filtereddiscounts = [];

    //filter items
    this.filtereddiscounts = this.discounts.filter((searchitem)=>
      searchitem.effective_From_Date.toDateString().includes(this.filterTerm)||
      searchitem.effective_To_Date.toDateString().includes(this.filterTerm)||
      searchitem.discount_Name.toLocaleLowerCase().includes(this.filterTerm.toLocaleLowerCase())||
      searchitem.discount_Amount == Number(this.filterTerm)
    );
   }*/

  getDiscounts(){
    this.service.GetAllDiscounts().subscribe(result =>{
      this.discounts = result as Discount[];
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
      else if(response.status == "Success"){
        this.addDiscountSuccessAlert();
      }
    })
  }

  EditDiscount(discount_ID:Number)
  {
    this.thisroute.navigate(['/edit-discounts', discount_ID]);
  }

  DeleteDiscount(Discount_ID: Number){
    this.service.DeleteDiscount(Discount_ID).subscribe(result => {
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
