import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StockItemColours } from 'src/app/Models/stockitemcolour';
import { StockItemColourDataService } from 'src/app/Services/stockitemcolours.service';
import { ToastController } from '@ionic/angular';
import { FormsModule, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
//for modal
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-stock-item-colours',
  templateUrl: './stock-item-colours.page.html',
  styleUrls: ['./stock-item-colours.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class StockItemColoursPage implements OnInit {
  /*filterTerm: string = "";
  stockitemcolours:any=StockItemColours;
  filteredStockItemColour = this.stockitemcolours.filter((items: { Stock_Item_Colour_Name: string,Stock_Item_Colour_Image:string; }) => 
  items.Stock_Item_Colour_Name.toLowerCase().includes(this.filterTerm.toLowerCase()));


  updateSearchResults() {
    this.filteredStockItemColour = this.stockitemcolours.filter((items: { Stock_Item_Colour_Name: string; }) =>
     items.Stock_Item_Colour_Name.toLowerCase().includes(this.filterTerm.toLowerCase()));
  }*/

  @ViewChild(IonModal) modal!: IonModal
  stockitemcolours: StockItemColours[] = [];
  colour: any;
  yourImageDataURL: any;
  

  constructor(public modalCtrl: ModalController, private toast: ToastController, 
    private service:StockItemColourDataService,
    private router: Router, private route: ActivatedRoute, private alertController: AlertController) {  }

  AddColourForm:FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
  });

  ngOnInit(): void {   
    this.GetStockItemColours();   
  }

  GetStockItemColours(){
    this.service.GetStockItemColours().subscribe(result =>{
      this.stockitemcolours = result as StockItemColours[];
      console.log(this.stockitemcolours)      
    })   
  }

  addcolour(){
    if (this.AddColourForm.valid){

    let addColour = new StockItemColours();
    addColour.stock_Item_Colour_Name = this.AddColourForm.value.name;
    this.service.AddStockItemColour(addColour).subscribe(result => {
      this.AddColourSuccessAlert();
    },
    (error) => {
      this.AddColourErrorAlert();
      console.error('Add stock colour error:', error);
    }
    );
    //this.presentLoading();
  }
  }

  deletecolour(stock_Item_Colour_ID:string){
    this.service.DeleteStockItemColour(stock_Item_Colour_ID).subscribe(result =>{
      if(result.status == "Error")
      {
        this.DeleteColourErrorAlert();
      }
      else if(result.status == "Success"){
        this.DeleteColourSuccessAlert();
      }
     });
  }

  canceladdmodal() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmaddmodal() {
    this.addcolour();    
  }

  //=============== edit ====
  isModalOpen = false;
  editColour: StockItemColours = new StockItemColours();
  editForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
  })

  EditColour(stock_Item_Colour_ID:string, isOpen: boolean)
  {    
    this.service.GetStockItemColour(stock_Item_Colour_ID).subscribe(response => {         
      this.editColour = response as StockItemColours;

      this.editForm.controls['name'].setValue(this.editColour.stock_Item_Colour_Name);
    })    
    this.isModalOpen = isOpen;
  }

  confirmeditmodal(){
    try
    {
      let editedColour = new StockItemColours();
      editedColour.stock_Item_Colour_Name = this.editForm.value.name;

      this.service.UpdateStockItemColour(this.editColour.stock_Item_Colour_ID, editedColour).subscribe(result =>{
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

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  //=============== Alerts ====
  async editSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Colour Updated',
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
      subHeader: 'Colour Was Not Updated',
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

  async DeleteColourSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Stock Colour Deleted',
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

  async DeleteColourErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Stock Colour was not deleted',
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
  async AddColourSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Stock Colour added',
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

  async AddColourErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Stock Colour was not added',
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
