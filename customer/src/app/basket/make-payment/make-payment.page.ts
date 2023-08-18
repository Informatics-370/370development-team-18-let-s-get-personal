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
import { DeliveryVM } from 'src/app/ViewModels/deliveryVM';
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { OrderT } from 'src/app/Models/basket';
import { Delivery } from 'src/app/Models/delivery';

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
  deliverycompanies:Delivery_Company[]=[];

  addedaddres!: DeliveryAddress;
  addeddeliveryrequest!: Delivery;

  ngOnInit() {
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
    dwellingtype: new FormControl('',[Validators.required]),
    deliveryCompanyID: new FormControl('',[Validators.required]),
  })
  
  //order = new OrderT();
  
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
    addDelivery.dwelling_Type = this.AddDelAddressForm.value.dwellingtype; 
    addDelivery.streetNumber = this.AddDelAddressForm.value.streetNumber;
    addDelivery.streetName = this.AddDelAddressForm.value.streetName;
    addDelivery.province = this.AddDelAddressForm.value.province;    

    this.service.AddDeliveryAdress(addDelivery).subscribe(response => {
      this.addedaddres = response as DeliveryAddress;
      try
      {
        console.log(this.addedaddres)
        //let addressID = this.addedaddres.delivery_Address_ID
        //localStorage.setItem('addressID', JSON.stringify(addressID));
        this.AddDeliveryRequest()
      }
      catch
      {
        this.addDeliveryErrorAlert()
      }
    })
  }

  AddDeliveryRequest(){
    //let addressID = JSON.parse(JSON.stringify(localStorage.getItem('addressID')));    
    try
    {
      let addDeliveryRequest = new Delivery();
      addDeliveryRequest.delivery_Address_ID = this.addedaddres.delivery_Address_ID //this.addedaddres.delivery_Address_ID addressID
      addDeliveryRequest.delivery_Company_ID = this.AddDelAddressForm.value.deliveryCompanyID

      this.service.AddDeliveryRequest(addDeliveryRequest).subscribe(res =>{
        let added = res as Delivery;
        let deliveryID = added.delivery_ID
        localStorage.setItem('deliveryID', JSON.stringify(deliveryID));
        this.router.navigate(["/tabs/check-out"])
      })
    }
    catch
    {
      this.addDeliveryErrorAlert()
    }    
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

//checkOut(){
  //   //change to delivery request 
  //   let streetName =this.AddDelAddressForm.get("streetName")?.value
  //   let streetNumber =this.AddDelAddressForm.get("streetNumber")?.value
  //   let city =this.AddDelAddressForm.get("city")?.value
  //   let province =this.AddDelAddressForm.get("province")?.value
  //   let areaCode =this.AddDelAddressForm.get("areaCode")?.value;
  //   let dwellingtype =this.AddDelAddressForm.get("dwellingtype")?.value;
  //   //let delivery_Company_ID =this.AddDelAddressForm.get("delivery_Company_ID")?.value;

  //   this.order = JSON.parse(localStorage.getItem('order') as string);
  //   this.order.deliveryAddress.streetName=streetName;
  //   this.order.deliveryAddress.streetNumber=streetNumber;
  //   this.order.deliveryAddress.city=city;
  //   this.order.deliveryAddress.province=province;
  //   this.order.deliveryAddress.areaCode=areaCode;
  //   this.order.deliveryAddress.dwelling_Type=dwellingtype;
  //   //this.order.deliveryAddress.delivery_Company_ID = delivery_Company_ID;

  //   localStorage.setItem("order",JSON.stringify(this.order));

  //   this.router.navigate(["/tabs/check-out"])
   
  // }