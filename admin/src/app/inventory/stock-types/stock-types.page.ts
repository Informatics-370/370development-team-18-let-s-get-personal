import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StockTypes } from 'src/app/Models/stocktypes';
import { StockTypeDataService } from 'src/app/Services/stocktype.service';
import { FormsModule, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuditTrailService } from 'src/app/Services/audittrail.service';
import { AuditTrail } from 'src/app/Models/adittrail';
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
@Component({
  selector: 'app-stock-types',
  templateUrl: './stock-types.page.html',
  styleUrls: ['./stock-types.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class StockTypesPage implements OnInit {
  action!: string
  @ViewChild(IonModal) modal!: IonModal
  stocktypes: StockTypes[] =[];
  constructor(
    public modalCtrl: ModalController, private service:StockTypeDataService, private router: Router,  
    private alertController: AlertController, private route:ActivatedRoute, private trailservice: AuditTrailService) { }

  AddTypeForm:FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required])      
  });     

  ngOnInit(): void {
  this.GetStockTypes();   
  }

  GetStockTypes(){
    this.service.GetStockTypes().subscribe(result =>{
      this.stocktypes = result as StockTypes[];
      console.log(this.stocktypes);
    })
  }

  inventoryNav()
  {
    this.router.navigate(['./tabs/inventory']);
  }

  addStockTypes(){
    let addStockType = new StockTypes();
    addStockType.stock_Type_Name = this.AddTypeForm.value.name;

      this.service.AddStockType(addStockType).subscribe(result => {
        if(result.status == "Error")
        {
          this.AddStockTypeSuccessAlert();
        }
        else if(result.status == "Success"){
          this.action = "Added Stock Type"
          this.AddTrail()
          this.AddStockTypeSuccessAlert();
        }
    })
  }
  
  canceladdmodal() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmaddmodal() {
    this.addStockTypes();    
  }

  //=============== Delete ===============
  deleteStockTypes(stock_Type_ID:string){
    this.service.DeleteStockType(stock_Type_ID).subscribe(result =>{
      if(result.status == "Error")
          {
            this.DeleteStockTypeErrorAlert();
          }
          else if(result.status == "Success"){
            this.action = "Deleted Stock Type"
            this.AddTrail()
            this.DeleteStockTypeSuccessAlert();
          }
    });
  }
  
  //=============== Edit ===============
  isModalOpen = false;
  editStockType: StockTypes = new StockTypes();
  editForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required])
  })

  EditType(discount_ID:string, isOpen: boolean)
  {    
    this.service.GetStockType(discount_ID).subscribe(response => {         
      this.editStockType = response as StockTypes;

      this.editForm.controls['name'].setValue(this.editStockType.stock_Type_Name);
    })    
    this.isModalOpen = isOpen;
  }

  confirmeditmodal(){
    try
    {
      let editedType = new StockTypes();
      editedType.stock_Type_Name = this.editForm.value.name;

      this.service.UpdateStockType(this.editStockType.stock_Type_ID, editedType).subscribe(result =>{
        this.action = "Deleted Stock Type"
        this.AddTrail()
        this.editSuccessAlert();
      })      
    }
    catch{      
      this.editErrorAlert();
    }    
  }

  canceleditmodal() {
    this.isModalOpen = false;
  }

  //========= Trail ========
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

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  //=============== Alerts ===============
  async DeleteStockTypeSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Stock Type Deleted',
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

  async DeleteStockTypeErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Stock Type was not deleted',
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

  async AddStockTypeSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Stock Type added',
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

  async AddStockTypeErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Stock Type was not added',
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

  async editSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Stock Type Updated',
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

  async editErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Stock Type Was Not Updated',
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

  reloadPage(){
    window.location.reload()
  }
}

//search function
/*searchValue: string ='';
  stocktypes:any=StockTypes;

  filteredStockType = this.stocktypes.filter((items: { stock_Type_Name: string;}) => 
  items.stock_Type_Name.toLowerCase().includes(this.searchValue));


  updateSearchResults() {
    this.filteredStockType = this.stocktypes.filter((items: { stock_Type_Name: string; }) =>
     items.stock_Type_Name.toLowerCase().includes(this.searchValue.toLowerCase()));
  }*/