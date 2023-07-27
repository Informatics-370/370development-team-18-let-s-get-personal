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

  @ViewChild(IonModal) modal!: IonModal
  stockitemcolours: StockItemColours[] = [];
  colour: any;
  yourImageDataURL: any;
  

  constructor(public modalCtrl: ModalController, private toast: ToastController, 
    private service:StockItemColourDataService,
    private router: Router, private route: ActivatedRoute, private alertController: AlertController) {  }

  AddColourForm:FormGroup = new FormGroup({
    name: new FormControl(['',Validators.required]),
    image: new FormControl(['',Validators.required])
  });

  ngOnInit(): void {   
    this.GetStockItemColours();   
  }

  GetStockItemColours(){
    this.service.GetStockItemColours().subscribe(result =>{
      this.stockitemcolours = result as StockItemColours[];
      console.log(this.stockitemcolours)
      // let colourlist: any[] = result
      // colourlist.forEach((element) =>{
      //   this.colour.push(element)
      // });
    })   
  }
  
  getstockcolour(stock_Item_Colour_ID:Number){
    this.router.navigate(['./editstockitemcolours',stock_Item_Colour_ID]);
  }

  addcolour(){
    let addColour = new StockItemColours();
    addColour.Stock_Item_Colour_Name = this.AddColourForm.value.name;
    addColour.Stock_Item_Colour_Image = this.AddColourForm.value.image;

    this.service.AddStockItemColour(addColour).subscribe(result => {
      if(result.status == "Error")
      {
        this.AddColourErrorAlert();
      }
      else if(result.status == "Success"){
        this.AddColourSuccessAlert();
      }
    })
  }

  deletecolour(stock_Item_Colour_ID:Number){
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

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  async DeleteColourSuccessAlert() {
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

  async DeleteColourErrorAlert() {
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
  async AddColourSuccessAlert() {
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

  async AddColourErrorAlert() {
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
