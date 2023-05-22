import { Component, OnInit,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormGroup, Validators, FormControl, ReactiveFormsModule  } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DeliveryCompanyDataService } from 'src/app/Services/deliverycompany.service';
import { DeliveryCompany } from 'src/app/Models/deliverycompany';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';


//for modal
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';



@Component({
  selector: 'app-delivery-company',
  templateUrl: './delivery-company.page.html',
  styleUrls: ['./delivery-company.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule],
  providers: [DeliveryCompanyDataService]
})
export class DeliveryCompanyPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal
  deliverycompanies: DeliveryCompany[] =[];

  constructor(public modalCtrl: ModalController, private service:DeliveryCompanyDataService,
    private router: Router, private currentroute: ActivatedRoute, private alertController: AlertController) { }
    AddTypeForm:FormGroup = new FormGroup({
      name: new FormControl(['',Validators.required])      
    });

    ngOnInit(): void {
      this.GetDeliveryCompanies();
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
      this.router.navigate(['./edit-delivery-company',DeliveryCompanyID]);
    }
  
    DeleteDeliveryCompany(DeliveryCompanyId:Number){
      this.service.DeleteDeliveryCompany(DeliveryCompanyId).subscribe(result =>{
        window.location.reload();
       });
    }
   

    
    canceladdmodal() {
      this.modal.dismiss(null, 'cancel');
    }
  
    async confirmaddmodal() {
      const alert = await this.alertController.create({
        header: 'Please Confirm that you would like to continue',
        buttons: ['Cancel', 'Continue']
      });
      await alert.present();
      this.modal.dismiss('confirm');
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
      this.modal.dismiss('confirm');
    }
  
    onWillDismiss(event: Event) {
      const ev = event as CustomEvent<OverlayEventDetail<string>>;
    }


  }

  /*listOfDeliveryCompanies: any[] | undefined;
  deliveryCompany!:any;
  
  companyName:String="";

  public alertButtons = ['OK'];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private deliverCompanyService:DeliveryCompanyDataService) { }

  ngOnInit() {

    this.getDeliveryCompanies();

    this.dtOptions={
      pagingType:'simple_numbers',
      pageLength:10,
      processing:true
    };
  }

  ngOnDestroy(): void {
    this.dtOptions ={destroy:true}
    this.dtTrigger.unsubscribe();
  }

  public onUpdate(id:any):void{
    this.deliverCompanyService.GetDeliveryCompany(id).subscribe(res=>{
      this.deliveryCompany=res;
      this.companyName=this.deliveryCompany.DeliveryCompanyName;
    })
    
  }

  public alertInputs = [
    {
      placeholder: 'Name',
      value:this.companyName
    },
  ];

  private getDeliveryCompanies():void{
    this.deliverCompanyService.GetDeliveryCompanies().subscribe(res=>{
      this.listOfDeliveryCompanies=res;
      this.dtTrigger.next(null);
    })

  }

}*/
