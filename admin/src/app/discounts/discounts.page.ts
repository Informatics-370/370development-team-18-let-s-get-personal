import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder, } from '@angular/forms';
import { Discount } from 'src/app/Models/discount';
import { DiscountService } from 'src/app/Services/discount.service';
import { StockItemDataService } from '../Services/stockitem.service';
import { AuditTrailService } from '../Services/audittrail.service';
import { AuditTrail } from '../Models/adittrail';
import { ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { StockItemViewModel } from '../ViewModels/stockitemsVM';
import { Stock_Item } from '../Models/stockitem';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.page.html',
  styleUrls: ['./discounts.page.scss'],
  standalone: true,
  providers: [DatePipe],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class DiscountsPage implements OnInit {
  discounts: Discount[] = [];
  Products: StockItemViewModel[] = [];
  stockItems: Stock_Item[] = [];


  @ViewChild(IonModal) modal!: IonModal
  constructor(private service: DiscountService, private thisroute: Router, public modalCtrl: ModalController,
    private alertController: AlertController, private _service: StockItemDataService, private formBuilder: FormBuilder,
    private trailservice: AuditTrailService) { }

  AddForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    effectiveFromdate: new FormControl('', [Validators.required, this.dateValidator.bind(this)]),
    effectiveTodate: new FormControl('', [Validators.required, this.dateValidator.bind(this)]),
    productID: new FormControl('', [Validators.required])
  })

  dateValidator(control: FormControl): { [key: string]: boolean } | null {
    const inputDate = new Date(control.value);
    const currentDate = new Date();

    if (inputDate < currentDate) {
      return { dateInPast: true }; // Return an error if the date is in the past
    }
    else if (control.parent) {
      const effectiveFromdate = control.parent.get('effectiveFromdate')?.value;
      const effectiveTodate = control.parent.get('effectiveTodate')?.value;

      if (effectiveTodate < effectiveFromdate) {
        return { notValid: true };
      }
    }
    return null; // Validation passed
  }



  ngOnInit(): void {
    this.getDiscounts();
    this.GetStockItems();
  }

  getDiscounts() {
    this.service.GetAllDiscounts().subscribe(result => {
      this.discounts = result;
      console.log(this.discounts)

    })
  }

  public GetStockItems() {
    this._service.GetStockItems().subscribe(result => {
      this.Products = result as StockItemViewModel[];
      console.log(this.Products)
    })
  }

  getProductName(stockId: string): string {
    const product = this.Products.find(product => product.stock_Item_ID === stockId);
    return product ? product.stock_Item_Name : '';

  }


  //=========== Add ===========
  AddDiscount() {
    console.log('Form error',this.AddForm.errors)
   // if(this.AddForm.valid){

    let addDiscount = new Discount();

    addDiscount.discount_Name = this.AddForm.value.name;
    addDiscount.discount_Amount = this.AddForm.value.amount;
    addDiscount.effective_From_Date = this.AddForm.value.effectiveFromdate;
    addDiscount.effective_To_Date = this.AddForm.value.effectiveTodate;
    addDiscount.stock_Id = this.AddForm.value.productID;

    console.log('Discount Name', addDiscount.discount_Name);
    console.log('Discount Amount', addDiscount.discount_Amount);
    console.log('Effective From Date', addDiscount.effective_From_Date);
    console.log('Effective To Date', addDiscount.effective_To_Date);
    console.log('Stock ID', addDiscount.stock_Id);
    const productName=this.getProductName(addDiscount.stock_Id)
    console.log('productName', productName)

    this.service.AddDiscount(addDiscount).subscribe(response => {

      this.addDiscountSuccessAlert();
      this.action = "Added discount: " + this.AddForm.value.name
      this.AddTrail()

    }, (error) => {
      this.addDiscountErrorAlert
      console.error('Discount error:', error);
    });
  //}
  }

  //=========== Edit ===========
  isModalOpen = false;
  editDiscount: Discount = new Discount();
  editForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    effectiveFromdate: new FormControl('', [Validators.required]),
    effectiveTodate: new FormControl('', [Validators.required])
  })


  EditDiscount(discount_ID: string, isOpen: boolean) {
    this.service.GetDiscount(discount_ID).subscribe(response => {
      this.editDiscount = response as Discount;

      this.editForm.controls['name'].setValue(this.editDiscount.discount_Name);
      this.editForm.controls['amount'].setValue(this.editDiscount.discount_Amount);
      this.editForm.controls['effectiveFromdate'].setValue(this.editDiscount.effective_From_Date);
      this.editForm.controls['effectiveTodate'].setValue(this.editDiscount.effective_To_Date);
    })
    this.isModalOpen = isOpen;
  }

  confirmeditmodal() {
    try {
      let editedDiscount = new Discount();
      editedDiscount.discount_Name = this.editForm.value.name;
      editedDiscount.discount_Amount = this.editForm.value.amount;
      editedDiscount.effective_From_Date = this.editForm.value.effectiveFromdate;
      editedDiscount.effective_To_Date = this.editForm.value.effectiveTodate;

      this.service.UpdateDiscount(this.editDiscount.discount_ID, editedDiscount).subscribe(result => {
        this.editDiscountSuccessAlert();

        this.action = "Updated discount from " + this.editDiscount.discount_Name + "," + this.editDiscount.discount_Amount + "," + this.editDiscount.effective_From_Date + "," + this.editDiscount.effective_To_Date
          + " to: " + this.editForm.value.name + "," + this.editForm.value.amount + "," + this.editForm.value.effectiveFromdate + "," + this.editForm.value.effectiveTodate
        this.AddTrail()
      })
    }
    catch {
      this.editDiscountErrorAlert();
    }
  }

  canceleditmodal() {
    this.isModalOpen = false;
    //this.modal.dismiss(null, 'cancel');
  }

  //=========== Delete ===========
  DeleteDiscount(discount_ID: string, discount_Name: string) {
    this.service.DeleteDiscount(discount_ID).subscribe(result => {
      console.log(result);
      if (result.status == "Error") {
        this.DeleteDiscountErrorAlert();
      }
      else if (result.status == "Success") {
        this.DeleteDiscountSuccessAlert();

        this.action = "Deleted Discount" + discount_Name
        this.AddTrail()
      }
    })
  }

  //=========== Audit trail ===========
  action!: string
  AddTrail() {
    let audittrail = new AuditTrail()
    let roles = JSON.parse(JSON.stringify(localStorage.getItem('roles'))); //userID
    let userID = JSON.parse(JSON.stringify(localStorage.getItem('userID'))) //JSON.parse(localStorage.getItem('userID') as string)


    if (roles == "Admin") {
      audittrail.admin_ID = userID
      audittrail.actionName = this.action
      this.trailservice.AddAdminAuditTrailItem(audittrail).subscribe(result => {
        console.log(result)
      })
    }
    else {
      audittrail.employee_ID = userID
      audittrail.actionName = this.action
      this.trailservice.AddEmployeeAuditTrail(audittrail).subscribe(result => {
        console.log(result)
      })
    }
  }


  reloadPage() {
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

  async editDiscountSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Discount Updated',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
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
        handler: () => {
          this.reloadPage();
        }
      }],
    });
    await alert.present();
  }

  async addDiscountSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Discount Added',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
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
        handler: () => {
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
        handler: () => {
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
        handler: () => {
          this.reloadPage();
        }
      }],
    });
    await alert.present();
  }
}
