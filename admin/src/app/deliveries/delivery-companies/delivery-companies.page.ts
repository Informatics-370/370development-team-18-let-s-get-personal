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
import { AuditTrailService } from 'src/app/Services/audittrail.service';
import { AuditTrail } from 'src/app/Models/adittrail';

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

  isLoading: boolean = false;
  // updateSearchResults() {
  //   this.filteredDeliveryCompany = this.deliverycompanies.filter((items: { Delivery_Company_Name: string; }) =>
  //    items.Delivery_Company_Name.toLowerCase().includes(this.filterTerm.toLowerCase()));
  // }

  @ViewChild(IonModal) modal!: IonModal
  constructor(private service:DeliveryDataService, private thisroute: Router, public modalCtrl: ModalController,
    private alertController:AlertController, private trailservice: AuditTrailService ) { }

  AddForm: FormGroup = new FormGroup({
    deliverycompanyname: new FormControl('',[Validators.required]),
    Delivery_Price: new FormControl('',[Validators.required])
  })

  ngOnInit(): void {
    this.isLoading=true;  
    this.getDeliveryCompany()
  }  

  getDeliveryCompany(){
    this.service.GetDeliveryCompanies().subscribe(result =>{
      this.deliverycompanies = result as Delivery_Company[];
      console.log(this.deliverycompanies)  
    },(error) => {
      this.ErrorAlert();        
      console.error(error);
    }).add(() => {
      this.isLoading = false; // Stop loading
    });
  }

  deliveriesnav()
  {
    this.thisroute.navigate(['./tabs/deliveries']);
  }

  RouteDeliveriesControlBreak()
  {
    this.thisroute.navigate(['./tabs/delivery-prices']);
  }

//========== Add ===========
  isAddModalOpen = false;
  OpenAddModal(isOpen: boolean){
    this.isAddModalOpen = isOpen;
  }

  canceladdmodal() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmaddmodal() {
    this.isLoading=true;  
    let AddDeliveryCompany = new Delivery_Company();
    AddDeliveryCompany.delivery_Price = this.AddForm.value.Delivery_Price;
    AddDeliveryCompany.delivery_Company_Name = this.AddForm.value.deliverycompanyname;

    this.service.AddDeliveryCompany(AddDeliveryCompany).subscribe(response => {
      this.addDeliveryCompanySuccessAlert();
      this.action = "Added Delivery Company: " + this.AddForm.value.deliverycompanyname
      this.AddTrail()
      this.isLoading=false;  

    },(error) => {
      this.addDeliveryCompanyErrorAlert();        
      console.error('Edit stock image error:', error);
      this.isLoading=false;
    })    
  }


//========== Delete ===========
  DeleteDeliveryCompany(delivery_Company_ID: string, delivery_Company_Name: string){
    this.service.DeleteDeliveryCompany(delivery_Company_ID).subscribe(result => {
      console.log(result);
      this.DeleteDeliveryCompanySuccessAlert();
      this.action = "Deleted Delivery Company: " + delivery_Company_Name
      this.AddTrail()
    },(error) => {
      this.DeleteDeliveryCompanyErrorAlert();        
      console.error('DeleteDeliveryCompany error:', error);
    })
  }

//========== Edit ===========
  isModalOpen = false;
  editCompany: Delivery_Company = new Delivery_Company();
  editForm: FormGroup = new FormGroup({
    deliverycompanyname: new FormControl('',[Validators.required]),
    Delivery_Price: new FormControl('',[Validators.required])
  })

  EditDeliveryCompany(delivery_Company_ID:string, isOpen: boolean)
  {
    
    this.service.GetDeliveryCompany(delivery_Company_ID).subscribe(result =>{
      this.editCompany = result as Delivery_Company
      this.editForm.controls['deliverycompanyname'].setValue(this.editCompany.delivery_Company_Name);
      this.editForm.controls['Delivery_Price'].setValue(this.editCompany.delivery_Price);
    })
    this.isModalOpen = isOpen;
  }

  confirmeditmodal(){
   /* try{*/
      this.isLoading=true;  
      let editedCompany = new Delivery_Company()
      editedCompany.delivery_Company_Name = this.editForm.value.deliverycompanyname
      editedCompany.delivery_Price = this.editForm.value.Delivery_Price

      this.service.UpdateDeliveryCompany(this.editCompany.delivery_Company_ID, editedCompany).subscribe(result => {
        this.UpdateDeliveryCompanySuccessAlert()
        this.action = "Updated discount from "+ this.editCompany.delivery_Company_Name + ", "+ this.editCompany.delivery_Price 
          + ", " + this.editForm.value.deliverycompanyname + ", "+ this.editForm.value.Delivery_Price 
        this.AddTrail()       
      },(error) => {
        this.UpdateDeliveryCompanyErrorAlert();        
        console.error('UpdateDeliveryCompany error:', error);
      }).add(() => {
        this.isLoading = false; // Stop loading
      });
   /* }
    catch{
      this.UpdateDeliveryCompanyErrorAlert()
    }*/
  }

  canceleditmodal() {
    this.isModalOpen = false;
    //this.modal.dismiss(null, 'cancel');
  }


//========== Audit trail ===========
  action!: string
  AddTrail(){
    let audittrail = new AuditTrail()
    let roles = JSON.parse(JSON.stringify(localStorage.getItem('roles'))); //userID
    let userID = JSON.parse(JSON.stringify(localStorage.getItem('userID'))) //JSON.parse(localStorage.getItem('userID') as string)

    
    if(roles == "Admin"){
      audittrail.admin_ID = userID
      audittrail.actionName = this.action
      this.trailservice.AddAdminAuditTrailItem(audittrail).subscribe(result =>{
        console.log(result)
      })
    }
    else{
      audittrail.employee_ID = userID
      audittrail.actionName = this.action
      this.trailservice.AddEmployeeAuditTrail(audittrail).subscribe(result =>{
        console.log(result)
      })
    }
  }

  reloadPage(){
    window.location.reload()
  }
  


  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

//====== Alerts =====
  async HelpAlert() {
    const alert = await this.alertController.create({
      header: 'Please Note: ',
      subHeader: 'Delivery companies will be pulled through as delivery options when the customer checks out their order',
      message: '',
      buttons: [{
          text: 'OK',
          role: 'cancel',
      }],
    });
    await alert.present();
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

  async UpdateDeliveryCompanyErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Delivery Company Was Not Updated.',
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

  async UpdateDeliveryCompanySuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Delivery Company Was Updated.',
      //message: 'Please try again',
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

  async ErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Something went wrong',
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
