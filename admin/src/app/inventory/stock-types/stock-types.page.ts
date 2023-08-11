import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StockTypes } from 'src/app/Models/stocktypes';
import { StockTypeDataService } from 'src/app/Services/stocktype.service';
import { FormsModule, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
//for modal
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
//search function
/*searchValue: string ='';
  stocktypes:any=StockTypes;

  filteredStockType = this.stocktypes.filter((items: { stock_Type_Name: string;}) => 
  items.stock_Type_Name.toLowerCase().includes(this.searchValue));


  updateSearchResults() {
    this.filteredStockType = this.stocktypes.filter((items: { stock_Type_Name: string; }) =>
     items.stock_Type_Name.toLowerCase().includes(this.searchValue.toLowerCase()));
  }*/

  @ViewChild(IonModal) modal!: IonModal
  stocktypes: StockTypes[] =[];
  constructor(
    public modalCtrl: ModalController, private service:StockTypeDataService, private router: Router,  
    private alertController: AlertController, private route:ActivatedRoute) { }

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

  addStockTypes(){
    let addStockType = new StockTypes();
    addStockType.stock_Type_Name = this.AddTypeForm.value.name;

      this.service.AddStockType(addStockType).subscribe(result => {
        if(result.status == "Error")
        {
          this.AddStockTypeSuccessAlert();
        }
        else if(result.status == "Success"){
          this.AddStockTypeSuccessAlert();
        }
    })
  }

  getstocktype(stock_Type_ID:number){
    //[routerLink]="['/course', course.courseId]"
    this.router.navigate(['./editstocktype',stock_Type_ID]);
  }

  deleteStockTypes(stock_Type_ID:number){
    this.service.DeleteStockType(stock_Type_ID).subscribe(result =>{
      if(result.status == "Error")
          {
            this.DeleteStockTypeErrorAlert();
          }
          else if(result.status == "Success"){
            this.DeleteStockTypeSuccessAlert();
          }
    });
  }

  

  canceladdmodal() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmaddmodal() {
    this.addStockTypes();
    
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

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

  reloadPage(){
    window.location.reload()
  }
}
