import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DeliveryDataService } from 'src/app/Services/deliveries.service';
import { Delivery_Company } from 'src/app/Models/deliverycompany';
import { RouterModule, Router } from '@angular/router';
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-delivery-companies',
  templateUrl: './delivery-companies.page.html',
  styleUrls: ['./delivery-companies.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class DeliveryCompaniesPage implements OnInit {

  filterTerm: string = "";
  deliverycompanies:Delivery_Company[]=[];
  filteredDeliveryCompany:Delivery_Company[]=[];

  // updateSearchResults() {
  //   this.filteredDeliveryCompany = this.deliverycompanies.filter((items: { Delivery_Company_Name: string; }) =>
  //    items.Delivery_Company_Name.toLowerCase().includes(this.filterTerm.toLowerCase()));
  // }

  @ViewChild(IonModal) modal!: IonModal
  constructor(private service:DeliveryDataService, private thisroute: Router, public modalCtrl: ModalController,
    private alertController:AlertController ) { }

  AddForm: FormGroup = new FormGroup({
    deliverycompanyname: new FormControl('',[Validators.required]),
    Delivery_Price: new FormControl('',[Validators.required])
  })

  ngOnInit(): void {
    this.getDeliveryCompany()
  }  

  getDeliveryCompany(){
    this.service.GetDeliveryCompanies().subscribe(result =>{
      this.deliverycompanies = result as Delivery_Company[];
      console.log(this.deliverycompanies)
    })
  }

  deliveriesnav()
  {
    this.thisroute.navigate(['./tabs/deliveries']);
  }

  AddDeliveryCompany(){
    let AddDeliveryCompany = new Delivery_Company();
    AddDeliveryCompany.delivery_Price = this.AddForm.value.Delivery_Price;
    AddDeliveryCompany.delivery_Company_Name = this.AddForm.value.deliverycompanyname;

    this.service.AddDeliveryCompany(AddDeliveryCompany).subscribe(response => {
      if(response.status == "Error")
      {
        this.addDeliveryCompanyErrorAlert();
      }
      else{
        this.addDeliveryCompanySuccessAlert();
      }
    })

  }

  EditDeliveryCompany(delivery_Company_ID:string)
  {
    this.thisroute.navigate(['/edit-company', delivery_Company_ID]);
  }

  DeleteDeliveryCompany(delivery_Company_ID: string){
    this.service.DeleteDeliveryCompany(delivery_Company_ID).subscribe(result => {
      console.log(result);
      if(result.status == "Error")
      {
        this.DeleteDeliveryCompanyErrorAlert();
      }
      else if(result.status == "Success"){
        this.DeleteDeliveryCompanySuccessAlert();
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
    this.AddDeliveryCompany();    
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  async addDeliveryCompanySuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Delivery Company Added!',
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

  async addDeliveryCompanyErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Delivery Company Was Unfortunately Not Added.',
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

  async DeleteDeliveryCompanySuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Delivery Company is successfully deleted!',
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

  async DeleteDeliveryCompanyErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Delivery Company Was Unfortunately Not Deleted.',
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
