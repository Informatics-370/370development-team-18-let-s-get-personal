import { Component, OnInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DeliveryCompany } from 'src/app/Models/deliverycompany';
import { DeliveryCompanyDataService } from 'src/app/Services/deliverycompany.service';
import { AlertController } from '@ionic/angular';
import { FormsModule, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//for modal
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';


@Component({
  selector: 'app-edit-deliverycompany',
  templateUrl: './edit-deliverycompany.page.html',
  styleUrls: ['./edit-deliverycompany.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [DeliveryCompanyDataService]
})
export class EditDeliverycompanyPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal
  //deliverycompanies: DeliveryCompany[] =[];
deliverycompany:any
  route: any;
  constructor(public modalCtrl: ModalController, private service:DeliveryCompanyDataService,
    private router: Router, private currentroute: ActivatedRoute, private alertController: AlertController) { }
    
    EditTypeForm:FormGroup = new FormGroup({
      name: new FormControl(['',Validators.required])      
    });
    ngOnInit():void {
      this.service.GetDeliveryCompany(+this.route.snapshot.params['DeliveryCompanyId']).subscribe(result =>{
        this.deliverycompany = result
        this.deliverycompany.patchValue({
          name: this.deliverycompany.name,
        });
      })
    }
    onSubmit(){
      this.service.UpdateDeliveryCompany(this.deliverycompany.DeliveryCompanyId, this.EditTypeForm.value).subscribe(result =>{
        this.router.navigate(['/stocktypes'])
      })
    }
   
    canceleditmodal() {
      this.modal.dismiss(null, 'cancel');
    }
  
    async confirmeditmodal() {
      const alert = await this.alertController.create({
        header: 'Please Confirm that you would like to continue',
        buttons: ['Cancel', 'Continue']
      });
      await alert.present();
  
      this.onSubmit();
      this.modal.dismiss('Continue');
    }
   
    onWillDismiss(event: Event) {
      const ev = event as CustomEvent<OverlayEventDetail<string>>;
    }
  
  }
  
  
