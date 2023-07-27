import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Discount } from 'src/app/Models/discount';
import { DiscountService } from 'src/app/Services/discount.service';

@Component({
  selector: 'app-edit-discounts',
  templateUrl: './edit-discounts.page.html',
  styleUrls: ['./edit-discounts.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class EditDiscountsPage implements OnInit {
  discount_ID!: number;
  discountToEdit: any;
  editDiscount: Discount = new Discount();

  constructor(private service:DiscountService, private thisroute: Router, 
    private currentroute: ActivatedRoute, private alertController:AlertController) { }

  editForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    amount: new FormControl('',[Validators.required]),
    effectiveFromdate: new FormControl('',[Validators.required]),
    effectiveTodate: new FormControl('',[Validators.required])
  })

  routeBack(){
    this.thisroute.navigate(['/discounts']);
  }

  ngOnInit(): void {
    this.currentroute.params.subscribe(params => { 
      this.service.GetDiscount(params['id']).subscribe(response => { 
 
       this.editDiscount = response as Discount;
 
       this.editForm.controls['name'].setValue(this.editDiscount.discount_Name);
       this.editForm.controls['amount'].setValue(this.editDiscount.discount_Amount);
       this.editForm.controls['effectiveFromdate'].setValue(this.editDiscount.effective_From_Date);
       this.editForm.controls['effectiveTodate'].setValue(this.editDiscount.effective_To_Date);
      }) 
    })
  }

  onSubmit(editForm: FormGroup){
    let editedDiscount = new Discount();
    editedDiscount.discount_Name = this.editForm.value.name;
    editedDiscount.discount_Amount = this.editForm.value.amount;
    editedDiscount.effective_From_Date = this.editForm.value.effectiveFromdate;
    editedDiscount.effective_To_Date = this.editForm.value.effectiveTodate;

    this.service.UpdateDiscount(this.discountToEdit.discount_ID, editedDiscount).subscribe(result =>{
      if(result.status == "Error")
      {
        this.editDiscountErrorAlert();
      }
      else if(result.status == "Success" ){
        this.editDiscountSuccessAlert();
      }
    })
  }

  reloadPage(){
    window.location.reload()
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

  async foundDiscountErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Discount Was Not Found',
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
