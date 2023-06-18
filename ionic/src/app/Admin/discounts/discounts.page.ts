import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
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

  discounts: Discount[] =[]
  @ViewChild(IonModal) modal!: IonModal
  constructor(private service:DiscountService, private thisroute: Router, public modalCtrl: ModalController ) { }

  AddForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    amount: new FormControl('',[Validators.required]),
    effectiveFromdate: new FormControl('',[Validators.required]),
    effectiveTodate: new FormControl('',[Validators.required])
  })

  ngOnInit(): void {
    this.getDiscounts()
  }

  getDiscounts(){
    this.service.GetAllDiscounts().subscribe(result =>{
      this.discounts = result as Discount[];
    })
  }

  AddDiscount(){
    let addDiscount = new Discount();

    addDiscount.Discount_Name = this.AddForm.value.name;
    addDiscount.Discount_Amount = this.AddForm.value.amount;
    addDiscount.Effective_From_Date = this.AddForm.value.effectiveFromdate;
    addDiscount.Effective_To_Date = this.AddForm.value.effectiveTodate;
    

    this.service.AddDiscount(addDiscount).subscribe((response:any) => {
      if(response.statusCode == 200)
      {
        alert(response.message)
        //this.thisroute.navigate(['/'])
      }
      else{
        alert(response.message)
      }
    })
  }

  EditDiscount(Discount_ID:Number)
  {
    this.thisroute.navigate(['/edit-discounts', Discount_ID]);
  }

  DeleteDiscount(Discount_ID: Number){
    this.service.DeleteDiscount(Discount_ID).subscribe(result => {
      console.log(result);
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

}
