import { Component, OnInit, EnvironmentInjector, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController, IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuditTrailService } from 'src/app/Services/audittrail.service';
import { AuditTrail } from 'src/app/Models/adittrail';
import { StockItemDataService } from 'src/app/Services/stockitem.service';
import { Stock_Item } from 'src/app/Models/stockitem';
@Component({
  selector: 'app-price-history',
  templateUrl: './price-history.page.html',
  styleUrls: ['./price-history.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PriceHistoryPage implements OnInit {
  stockitems!: Stock_Item[];
  action!: string
  constructor(public environmentInjector: EnvironmentInjector, private router: Router, private alertController:AlertController,
    public stockitemservice: StockItemDataService, private trailservice: AuditTrailService) { }

  ngOnInit() {
    this.GetAllStockItems()
  }

  GetAllStockItems(){
    this.stockitemservice.GetStockItemPriceHistory().subscribe(result =>{
      this.stockitems = result as Stock_Item[];
    })    
  }

  inventoryNav()
  {
    this.router.navigate(['./tabs/inventory']);
  }

//========== Trail ===============
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

  async HelpAlert() {
    const alert = await this.alertController.create({
      header: ' ',
      subHeader: 'A Products price History automatically updates when yu add or update an items price. ',
      message: "This action will not remove the Product, only decrease it's quantity" ,
      buttons: [{
          text: 'OK',
          role: 'cancel',
      }],
    });
    await alert.present();
  }

}
