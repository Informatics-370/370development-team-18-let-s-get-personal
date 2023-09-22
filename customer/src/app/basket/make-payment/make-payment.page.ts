import { Component, OnInit,Output,ViewChild,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeliveryAddress } from 'src/app/Models/deliveryaddress';
import { DeliveryDataService } from 'src/app/Services/deliveries.service';
import { Delivery_Company } from 'src/app/Models/deliverycompany';
import { AlertController, IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { OrderRequestService } from 'src/app/Services/orderrequest.service';
import { DeliveryVM } from 'src/app/ViewModels/deliveryVM';
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { OrderT } from 'src/app/Models/basket';
import { Delivery } from 'src/app/Models/delivery';
import { AuditTrail } from 'src/app/Models/audittrail';
import { AuditTrailService } from 'src/app/Services/audittrail.service';
import { NavController } from '@ionic/angular';
import { PlacesService } from 'src/app/Services/PlacesService ';

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


  oLong:number=28.2310411;
  oLat:number=-25.756598;;
  Long!:number;
  Lat!:number;

  chargeRatePerKm:any=10;

  distanceInKm:any;

  ngOnInit() {
    this.getDeliveryCompany();
  }

  @ViewChild(IonModal) modal!: IonModal
  constructor(private service:OrderRequestService, private router: Router, public modalCtrl: ModalController,
    private alertController:AlertController, public delservice: DeliveryDataService, private auditservice: AuditTrailService,public navCtrl: NavController,private placesService: PlacesService) { }


    validProvinces = ['Limpopo', 'Gauteng', 'North West','Kwa-Zulu Natal','Eastern Cape','Mpumalanga','Western Cape','Free State','Northern Cape'];
    dwellingType = ['House', 'Apartment','Estate'];


  AddDelAddressForm: FormGroup = new FormGroup({
    streetNumber: new FormControl('',[Validators.required, Validators.max(99999)]),
    streetName: new FormControl('',[Validators.required]),
    province: new FormControl('',[Validators.required]),
    city: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]),
    //areaCode: new FormControl('',[Validators.required,Validators.minLength(4), Validators.maxLength(4)]),
    areaCode:new FormControl('',[Validators.required,Validators.minLength(4), Validators.maxLength(4)]),//Validators.pattern('/^(0\d{1,2}|0\d{3}-\d{4})$/')
    dwellingtype: new FormControl('',[Validators.required]),
    deliveryCompanyID: new FormControl('',[Validators.required]),
  })

  get f(){return this.AddDelAddressForm.controls}
  
  //order = new OrderT();
  
  getDeliveryCompany(){
    this.delservice.GetDeliveryCompanies().subscribe(result =>{
      this.deliverycompanies = result as Delivery_Company[];
      console.log('DeliveryCompanies',this.deliverycompanies)
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
      //this.AddDeliveryRequest();
      this.confirmAlert();
      console.log('Address',this.addedaddres)
        let addressID = this.addedaddres.delivery_Address_ID
        localStorage.setItem('addressID', JSON.stringify(addressID));
        
      /*try
      {
        console.log(this.addedaddres)
        //let addressID = this.addedaddres.delivery_Address_ID
        //localStorage.setItem('addressID', JSON.stringify(addressID));
        this.AddDeliveryRequest()
      }
      catch
      {
        this.addDeliveryErrorAlert()
      }*/
    },(error) => {
      this.addDeliveryErrorAlert();
      console.error('add address error:', error);
    });
  }

  @Output() predictionSelected = new EventEmitter<string>();

  searchControl = new FormControl();
  showPredictions = false;
  predictions: any[] = [];

updateSearchResults() {
    const query = this.searchControl.value;
    if (query && query.length >= 3) {
      this.placesService.getPlacePredictions(query).subscribe(
        (predictions) => {
          this.predictions = predictions;
          this.showPredictions = true;
        },
        () => {
          this.predictions = [];
          this.showPredictions = false;
        }
      );
    } else {
      this.predictions = [];
      this.showPredictions = false;
    }
  }

  selectPrediction(prediction: any) {
    this.searchControl.setValue(prediction.description);
    this.showPredictions = false;
    this.predictionSelected.emit(prediction.description);
    console.log('Location:',prediction.description);
    this.getCordinate(prediction.description)

    console.log("Distacnce:" +this.distanceInKm)

     //this.calculateDistance(this.oLat,this.oLong,this.Lat,this.Long);
  }
  deliveryPrice:any;
  async getCordinate(address:any){
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyDmbh7Bh6P-aR-w9LJMdy6c3zTVhDd-K3A`)
    .then(response=>response.json()).then(data=>{

      console.log(data)

      if(data.status==="OK" && data.results.length>0){
        const location=data.results[0].geometry.location;

        this.Lat= location.lat;
        this.Long=location.lng;    
        this.distanceInKm=this.calculateDistance(this.oLat,this.oLong,this.Lat,this.Long);
        console.log(this.distanceInKm)
        const charge = (this.distanceInKm *this.chargeRatePerKm).toFixed(2); // Round to the nearest 100
        this.deliveryPrice=charge;
        console.log("Price based on distance "+charge)
    
    }else{
      console.error("Something is wrong");
    }
        
    }).catch(err=>console.error("Error"+err));
  }
    
  calculateDistance(oLat:number,oLong:number,lat:number,long:number):number{
    const radOLat = (Math.PI / 180) * oLat;
    const radOLong = (Math.PI / 180) * oLong;
    const radLat = (Math.PI / 180) * lat;
    const radLong = (Math.PI / 180) * long;

    const dLat = radLat - radOLat;
    const dLon = radLong - radOLong;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(radOLat) * Math.cos(radLat) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = 6371 * c; // Radius of the Earth in kilometers

    return distance;

  }
  
  


  AddDeliveryRequest(){
    let addressID = JSON.parse(JSON.stringify(localStorage.getItem('addressID')));
      let addDeliveryRequest = new Delivery();
      addDeliveryRequest.delivery_Address_ID = this.addedaddres.delivery_Address_ID //this.addedaddres.delivery_Address_ID addressID
      addDeliveryRequest.delivery_Company_ID = this.AddDelAddressForm.value.deliveryCompanyID

      console.log(this.deliveryPrice)

      this.service.AddDeliveryRequest(addDeliveryRequest).subscribe(res =>{
        let added = res as Delivery;
        let deliveryID = added.delivery_ID
        localStorage.setItem('deliveryID', deliveryID);

        //Action Trail
        this.action = "Added Delivery Address"
        this.AddAuditTrail()

        this.router.navigate(["/tabs/check-out"])
      },
      (error) => {
        this.confirmErrorAlert();
        console.error('add delivery error:', error);
      });
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

//========= Audit Trail ========
  action!: string
  AddAuditTrail(){
    let customer_ID = JSON.parse(JSON.stringify(localStorage.getItem('customerID')))
    let audittrail = new AuditTrail()
    audittrail.customer_ID = customer_ID
    audittrail.actionName = this.action

    this.auditservice.AddCustomerAuditTrail(audittrail).subscribe(result => {
      console.log(result)
    })
  }

  public ContactUs() {
    this.router.navigate(["/tabs/contact-us"])
  }

  async DeliveryTip() {
    const alert = await this.alertController.create({
      header: 'Please note: We do require you to full out each of the details reflected below.',
      subHeader: 'Each delivery company have their own prices. This price will reflect once you have confirmed your address',
      message:'If you are having issues with adding your address please contact us on our contact us page.',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        // handler: () => {
        //   this.reloadPage();
        // }
      },{
        text: 'Contact Us',
        //role: 'cancel',
        handler: () => {
          this.ContactUs();
        }
      }],
    });
    await alert.present();
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

  async confirmErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'There is an issue with confirming your address!',
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
  async confirmAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Confirmed.',
      message: 'Proceed to payment.',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler:() =>{
          //this.reloadPage();
          this.AddDeliveryRequest()
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