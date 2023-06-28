import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
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

  constructor(private service:DiscountService, private thisroute: Router, private currentroute: ActivatedRoute) { }

  editForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    amount: new FormControl('',[Validators.required]),
    effectiveFromdate: new FormControl('',[Validators.required]),
    effectiveTodate: new FormControl('',[Validators.required])
  })
  discountToEdit: any

  ngOnInit(): void {
    this.service.GetDiscount(+this.currentroute.snapshot.params['id']).subscribe(result =>{
      this.discountToEdit = result
      this.editForm.patchValue({
        name: this.discountToEdit.name,
        amount: this.discountToEdit.amount,
        effectiveFromdate: this.discountToEdit.effectiveFromdate,
        effectiveTodate: this.discountToEdit.effectiveTodate
      });
    })
  }

  onSubmit(){
    let editedDiscount = new Discount();
    editedDiscount.Discount_Name = this.editForm.value.name;
    editedDiscount.Discount_Amount = this.editForm.value.amount;
    editedDiscount.Effective_From_Date = this.editForm.value.effectiveFromdate;
    editedDiscount.Effective_To_Date = this.editForm.value.effectiveTodate;
    this.service.UpdateDiscount(this.discountToEdit.Discount_ID, editedDiscount).subscribe(result =>{
      this.thisroute.navigate(['/discounts'])
    })
  }
}
