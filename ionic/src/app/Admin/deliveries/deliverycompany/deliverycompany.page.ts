import { Component, OnInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormGroup, Validators, FormControl, ReactiveFormsModule  } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DeliveryCompanyDataService } from 'src/app/Services/deliverycompany.service';
//import { DeliveryCompany } from 'src/app/Models/deliverycompany';
import { Delivery_Company } from 'src/app/Models/deliverycompany';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';


//for modal
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-deliverycompany',
  templateUrl: './deliverycompany.page.html',
  styleUrls: ['./deliverycompany.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule],
  providers: [DeliveryCompanyDataService]
})
export class DeliverycompanyPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal
  deliverycompanies: Delivery_Company[] =[];

  constructor(public modalCtrl: ModalController, private service:DeliveryCompanyDataService,
    private router: Router, private currentroute: ActivatedRoute, private alertController: AlertController) { }

    AddTypeForm:FormGroup = new FormGroup({
      name: new FormControl(['',Validators.required])      
    }); 
    
    ngOnInit(): void {
      this.GetDeliveryCompanies();
    }

    EditCompany()
    {
      this.router.navigate(['./edit-deliverycompany']);
    }

    GetDeliveryCompanies(){
      this.service.GetDeliveryCompanies().subscribe(result =>{
        let deliverycompanylist: any[] = result
        deliverycompanylist.forEach((element)=>{
          this.deliverycompanies.push(element)
        });
       })
    }
  
    AddDeliveryCompany(){
      this.service.AddDeliveryCompany(this.AddTypeForm.value).subscribe(result => {
        this.canceladdmodal();
        console.log(result);        
        this.modal.dismiss('Continue');
        window.location.reload();
    })
    }
  
    UpdateDeliveryCompany(DeliveryCompanyId:Number){
      this.router.navigate(['./edit-delivery-company',DeliveryCompanyId]);
    }
  
    DeleteDeliveryCompany(DeliveryCompanyId:Number){
      this.service.DeleteDeliveryCompany(DeliveryCompanyId).subscribe(result =>{
        window.location.reload();
       });
    }
   

    
    canceladdmodal() {
      this.modal.dismiss(null, 'cancel');
    }
  
    async confirmaddAlert() {
      const alert = await this.alertController.create({
        header: 'Please Confirm that you would like to continue',
        buttons: ['Cancel', 'Continue']
      });
      await alert.present();
      this.modal.dismiss('Cancel');
    }
  
    canceleditmodal() {
      this.modal.dismiss(null, 'cancel');
    }
  
    async confirmeditAlert() {
      const alert = await this.alertController.create({
        header: 'Please Confirm that you would like to continue',
        buttons: ['Cancel', 'Continue']
      });
      await alert.present();
      this.modal.dismiss('Cancel');
    }
  
    onWillDismiss(event: Event) {
      const ev = event as CustomEvent<OverlayEventDetail<string>>;
    }


  }

  
