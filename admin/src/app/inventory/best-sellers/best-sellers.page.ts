import { Component, OnInit, EnvironmentInjector, ViewChild, ElementRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicModule, LoadingController, IonModal, ModalController } from '@ionic/angular';
import { Best_Sellers } from 'src/app/Models/bestsellers';
import { BestsellersService } from 'src/app/Services/bestsellers.service';
import { SalesVM } from 'src/app/ViewModels/salesVM';
import { SalesService } from 'src/app/Services/sales.service';
import { Payment } from 'src/app/Models/payment';
import { StockItemDataService } from 'src/app/Services/stockitem.service';
import { Stock_Item } from 'src/app/Models/stockitem';
import { StockItemViewModel } from 'src/app/ViewModels/stockitemsVM';
import { BestSellerVM } from 'src/app/ViewModels/bestsellerVM';
import { AuditTrailService } from 'src/app/Services/audittrail.service';
import { AuditTrail } from 'src/app/Models/adittrail';
@Component({
  selector: 'app-best-sellers',
  templateUrl: './best-sellers.page.html',
  styleUrls: ['./best-sellers.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class BestSellersPage implements OnInit {
  sales: Payment[] =[]
  bestsellers: BestSellerVM[] =[]
  Products: Stock_Item[] = [];
  @ViewChild(IonModal) modal!: IonModal
  constructor(private service: SalesService, private bestsellerservice: BestsellersService, 
    private alertController:AlertController, public stockitemservice: StockItemDataService, private trailservice: AuditTrailService) 
  { }

  ngOnInit() {
    this.GetAllStockItems()
  }

  GetBestSellers(){
    this.bestsellerservice.GetBestSellers().subscribe(result => {
      this.bestsellers = result as BestSellerVM[]
    })
  }

  GetAllStockItems(){
    this.service.GetSalesGraph().subscribe(result =>{
      this.Products = result as Stock_Item[];
    })    
  }

//======= Add ==========
  AddBestSellerForm: FormGroup = new FormGroup({
    Stock_Item_ID: new FormControl('',[Validators.required])
  })

  canceladdmodal() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmaddmodal() {
    this.AddToBestSellers();
  }

  AddToBestSellers(){

  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  
//========= Delete ========
  RemoveFromBestSellers(best_Seller_ID: string){

  }

  //========= Trail ========
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

  
//========= Alerts ========
  async HelpAlert() {
    const alert = await this.alertController.create({
      header: '',
      subHeader: '',
      buttons: [{
          text: 'OK',
          role: 'cancel',
      }],
    });
    await alert.present();
  }

}
