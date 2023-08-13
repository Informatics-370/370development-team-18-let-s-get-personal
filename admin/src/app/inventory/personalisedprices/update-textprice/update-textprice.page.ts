import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule,  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PersonalisationService } from 'src/app/Services/personalisation.service';
import { Image_Price } from 'src/app/Models/imageprice';
import { TextPrice } from 'src/app/Models/textprice';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-update-textprice',
  templateUrl: './update-textprice.page.html',
  styleUrls: ['./update-textprice.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule]
})
export class UpdateTextpricePage implements OnInit {
  textprice: any
  id!: any
  constructor(public service: PersonalisationService , private router: Router, private route:ActivatedRoute) { }

  TextpriceForm = new FormGroup(
  {
    Text_Price_Amount: new FormControl('', [Validators.min(1)]),
  })
    

  ngOnInit() : void {
    this.id = this.route.snapshot.paramMap.get('text_Price_ID')
    this.service.GetTextPrice(this.id).subscribe(result => {
      this.textprice = result
      this.TextpriceForm.patchValue({
        Text_Price_Amount: this.textprice.text_Price_Amount
      });
    })
  }

  onSubmit(){
//addStockType.stock_Type_Name = this.AddTypeForm.value.name;
    // this.service.UpdateTextPrice(this.textprice.text_Price_ID, this.TextpriceForm.value).subscribe(result => {
    //     this.router.navigate(['/tabs/stock-take'])
    // })
  }
}
