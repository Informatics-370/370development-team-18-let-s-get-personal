import { Component, OnInit, EnvironmentInjector, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController, IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
//services and models
import { StockItemDataService } from 'src/app/Services/stockitem.service';
import { Stock_Item } from 'src/app/Models/stockitem';
import { BestsellersService } from 'src/app/Services/bestsellers.service';
import { InventoryDataService } from 'src/app/Services/inventory.service';
import { Write_Off } from 'src/app/Models/writeoff';
import { StockItemViewModel } from 'src/app/ViewModels/stockitemsVM';
import { Write_Off_Line_Item } from 'src/app/Models/writeofflineitem';
import { PersonalisationService } from 'src/app/Services/personalisation.service';

@Component({
  selector: 'app-stock-take',
  templateUrl: './stock-take.page.html',
  styleUrls: ['./stock-take.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class StockTakePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal
  editProduct: Stock_Item = new Stock_Item();
  Products: StockItemViewModel[] = [];
  stockitems!: Stock_Item[];

  constructor(public environmentInjector: EnvironmentInjector, private router: Router,
    public bestsellerservice:BestsellersService, private alertController:AlertController,     
    public stockitemservice: StockItemDataService, private inventoryservice: InventoryDataService, 
    public pservice: PersonalisationService) { }
    
  ngOnInit() {
    this.GetAllStockItems();
  }

  GetAllStockItems(){
    this.stockitemservice.GetStockItems().subscribe(result =>{
      this.Products = result as StockItemViewModel[];
    })    
  }

  prevWriteOffsNav(){
    this.router.navigate(['./tabs/write-off']);
  }

//========== Stock Take ===============
  isModalOpen = false;
  editForm: FormGroup = new FormGroup({
    Inventory_Comments: new FormControl(''),
    Stock_Item_Quantity: new FormControl('',[Validators.required]),
  })

  UpdateQuantity(stock_Item_ID:string, isOpen: boolean)
  {    
    this.stockitemservice.GetStockItem(stock_Item_ID).subscribe(response => {         
      this.editProduct = response as Stock_Item;

      this.editForm.controls['Inventory_Comments'].setValue(this.editProduct.inventory_Comments);
      this.editForm.controls['Stock_Item_Quantity'].setValue(this.editProduct.stock_Item_Quantity);
    })
    
    this.isModalOpen = isOpen;
  }

  confirmeditmodal(){
    try
    {
      let editedProduct = new Stock_Item();
      editedProduct.stock_Item_Quantity = this.editForm.value.Stock_Item_Quantity;
      editedProduct.inventory_Comments = this.editForm.value.Inventory_Comments;

      this.inventoryservice.Stocktake(this.editProduct.stock_Item_ID, editedProduct).subscribe(result =>{
        if(result.status == "Success"){
          this.editSuccessAlert();
        }       
      })
    }
    catch{      
      this.editErrorAlert();
    }    
  }

  canceleditmodal() {
    this.isModalOpen = false;
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  //========== Write off ===============
  
  isWriteOffModalOpen = false;
  writeoffForm: FormGroup = new FormGroup({
    Write_Off_Reason: new FormControl('',[Validators.required]),
    Write_Off_Quantity: new FormControl('',[Validators.required]),
  })

  WriteOffModal(stock_Item_ID:string, isOpen: boolean){    
    localStorage.setItem('stockitemID', JSON.stringify(stock_Item_ID));
    this.isWriteOffModalOpen = isOpen;
  }

  //add to write off
  Writeoff() 
  {
    try
    {
      let writeoff = new Write_Off();
      this.inventoryservice.AddToWriteoff(writeoff).subscribe(result => {
        writeoff = result as Write_Off
        console.log(writeoff)
        let writeoffID = writeoff.write_Off_ID
        localStorage.setItem('writeoffID', JSON.stringify(writeoffID));
      })

      this.WriteOffLine()
    }
    catch
    {
      this.WriteOffErrorAlert()
    }
  }

  //add to write off line item
  WriteOffLine() 
  {
    let lineitem = new Write_Off_Line_Item()

    let stockitemID = JSON.parse(localStorage.getItem('stockitemID') as string)//JSON.parse(JSON.stringify(localStorage.getItem('stockitemID')));
    let writeoffID = JSON.parse(JSON.stringify(localStorage.getItem('writeoffID')));   
    lineitem.write_Off_Quantity = this.writeoffForm.value.Write_Off_Quantity
    lineitem.write_Off_Reason = this.writeoffForm.value.Write_Off_Reason
    lineitem.stock_Item_ID = stockitemID
    lineitem.write_Off_ID = writeoffID
    try
    {
      this.inventoryservice.AddToWriteoffLine(lineitem).subscribe(result => {
        if(result.status == "Success"){
          this.WriteOffLineSuccessAlert()
        }
      })
    }
    catch
    {
      this.WriteOffLineErrorAlert()
    }
  }

//========== Alerts ===============

  async editSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Product Updated',
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
      subHeader: 'Product Was Not Updated',
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

  async WriteOffLineSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Write off completed',
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

  async WriteOffLineErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Write off was not completed',
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

  async WriteOffErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Write off request faild',
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
