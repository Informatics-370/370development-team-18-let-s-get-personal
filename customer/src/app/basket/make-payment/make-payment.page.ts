import { Component, OnInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeliveryAddress } from 'src/app/Models/deliveryaddress';
import { DeliveryDataService } from 'src/app/Services/deliveries.service';
import { Delivery_Company } from 'src/app/Models/deliverycompany';
import { AlertController, IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { OrderRequestService } from 'src/app/Services/orderrequest.service';
//for modal
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { OrderT } from 'src/app/Models/basket';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.page.html',
  styleUrls: ['./make-payment.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class MakePaymentPage implements OnInit {
  searchValue: string ='';
  deliveries:DeliveryAddress[]=[];
  filteredDelivery:DeliveryAddress[]=[];
  deliverycompanies:Delivery_Company[]=[];

  ngOnInit() {
    //this.GetAllDeliveries();
    this.getDeliveryCompany();
  }

  @ViewChild(IonModal) modal!: IonModal
  constructor(private service:OrderRequestService, private router: Router, public modalCtrl: ModalController,
    private alertController:AlertController, public delservice: DeliveryDataService) { }

  AddDelAddressForm: FormGroup = new FormGroup({
    streetNumber: new FormControl('',[Validators.required]),
    streetName: new FormControl('',[Validators.required]),
    province: new FormControl('',[Validators.required]),
    city: new FormControl('',[Validators.required]),
    areaCode: new FormControl('',[Validators.required]),
    country: new FormControl('',[Validators.required]),
  })
  
  order = new OrderT();

  checkOut(){

    let streetName =this.AddDelAddressForm.get("streetName")?.value;
/* add for delivery inputs>>>
>>*/
    this.order = JSON.parse(localStorage.getItem('order') as string);
   this.order.deliveryAddress.streetName=streetName;
/*add them to them (delivery stuff) order>>>
>>>>*/
    localStorage.setItem("order",JSON.stringify(this.order));

    this.router.navigate(["/tabs/check-out"])
   
  }
  
  getDeliveryCompany(){
    this.delservice.GetDeliveryCompanies().subscribe(result =>{
      this.deliverycompanies = result as Delivery_Company[];
      console.log(this.deliverycompanies)
    })
  }

  AddDeliveryAddress(){
    let addDelivery = new DeliveryAddress();
    addDelivery.city = this.AddDelAddressForm.value.city;
    addDelivery.areaCode = this.AddDelAddressForm.value.areaCode;
    addDelivery.country = this.AddDelAddressForm.value.country; 
    addDelivery.streetNumber = this.AddDelAddressForm.value.streetNumber;
    addDelivery.streetName = this.AddDelAddressForm.value.streetName;
    addDelivery.province = this.AddDelAddressForm.value.province;    

    this.service.AddDeliveryAdress(addDelivery).subscribe(response => {
      if(response.status == "Error")
      {
        this.addDeliveryErrorAlert();
      }
      else{
        this.addDeliverySuccessAlert();
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
    this.AddDeliveryAddress();    
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  async addDeliverySuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Delivery Added!',
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

  async addDeliveryErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Delivery Was Not Added',
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
