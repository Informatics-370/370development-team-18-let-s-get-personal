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
  selector: 'app-stocktypes',
  templateUrl: './stocktypes.page.html',
  styleUrls: ['./stocktypes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [StockTypeDataService]
})
export class StocktypesPage implements OnInit {
 @ViewChild(IonModal) modal!: IonModal
  stocktypes: StockTypes[] =[];
  constructor(
    public modalCtrl: ModalController, 
    private service:StockTypeDataService,
    private router: Router,  
    private alertController: AlertController, 
    private route:ActivatedRoute) { }

    AddTypeForm:FormGroup = new FormGroup({
      name: new FormControl(['',Validators.required])      
    });     
 
  ngOnInit(): void {
   this.GetStockTypes();   
  }

  GetStockTypes(){
   this.service.GetStockTypes().subscribe(result =>{
    console.log(result);
    let stocktypelist: StockTypes[] = result;
    stocktypelist.forEach((element)=>{
      this.stocktypes.push(element)
    });
   })
  }

  addStockTypes(){
      this.service.AddStockType(this.AddTypeForm.value).subscribe(result => {
        this.canceladdmodal();
        console.log(result);        
        this.modal.dismiss('Continue');
        window.location.reload();
    })
  }

  getstocktype(stock_Type_ID:Number){
    //[routerLink]="['/course', course.courseId]"
    this.router.navigate(['./editstocktype',stock_Type_ID]);
  }

  deleteStockTypes(stock_Type_ID:Number){
   this.service.DeleteStockType(stock_Type_ID).subscribe(result =>{
    window.location.reload();
   });
  }

  canceladdmodal() {
    this.modal.dismiss(null, 'cancel');
  }

   confirmaddmodal() {
  //  const alert = await this.alertController.create({
  //    header: 'Please Confirm that you would like to continue',
 //     buttons: ['Cancel', 'Continue']
  //  });
  //  await alert.present();
    this.addStockTypes();
    
  }
  
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

}
