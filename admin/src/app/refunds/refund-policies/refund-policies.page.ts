import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { RefundService } from 'src/app/Services/refund.service';
import { Refund } from 'src/app/Models/refund';
import { Refund_Policy } from 'src/app/Models/refundpolicy';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { tap } from 'rxjs/operators';


//for modal
import { ModalController} from '@ionic/angular'; 
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-refund-policies',
  templateUrl: './refund-policies.page.html',
  styleUrls: ['./refund-policies.page.scss'],
  standalone: true,
  providers: [DatePipe],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule]
})
export class RefundPoliciesPage implements OnInit {

  filterTerm: string = "";
  filteredRefundPolicies: Refund_Policy[] = [];

  filteredpolicies:  Refund_Policy[] = [];
  refundPolicies: Refund_Policy[] =[]

  prevRefunds:Refund[]=[];
  @ViewChild(IonModal) modal!: IonModal
  constructor(private service:RefundService, private router: Router, 
    private alertController:AlertController, private modalCtrl: ModalController,private datePipe: DatePipe ) { }

  ngOnInit(): void {
    this.getAllRefundPolicies();
   /* //if(this.filterTerm==""){
      this.filteredpolicies = this.refundPolicies;
    //}
    console.log('refundPolicies',this.refundPolicies)
    console.log('filtered',this.filteredRefundPolicies)*/

    this.getAllRefundPolicies().subscribe(() => {
      if(this.filterTerm==""){
        this.filteredpolicies = this.refundPolicies;
      }
      console.log('refundPolicies', this.refundPolicies);
      console.log('filtered', this.filteredRefundPolicies);
    });
  }

  AddForm: FormGroup = new FormGroup({
    date: new FormControl('',[Validators.required,this.dateValidator.bind(this)]),
    version: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required])
  })
  
  dateValidator(control: FormControl): { [key: string]: boolean } | null {
    const inputDate = new Date(control.value);
    const currentDate = new Date();

    if (inputDate < currentDate) {
      return { dateInPast: true }; // Return an error if the date is in the past
    }
    
    return null; // Validation passed
  }

  searchByDate(date: string) {
    this.filteredRefundPolicies = this.refundPolicies.filter(item => {
      const policyDate = this.datePipe.transform(item.refund_Policy_Date, 'yyyy-MM-dd');
      return policyDate && policyDate.includes(date);
    });
    console.log('search',this.refundPolicies)
  }

  salesNav()
  {
    this.router.navigate(['./tabs/sales']);
  }


  getAllRefundPolicies(){
    /*this.service.GetAllRefundPolicies().subscribe(result =>{
      this.refundPolicies = result as Refund_Policy[];
      console.log(this.refundPolicies);
    })*/
    return this.service.GetAllRefundPolicies().pipe(
      tap(result => {
        this.refundPolicies = result as Refund_Policy[];
        this.filteredRefundPolicies=this.refundPolicies;
        console.log('m',this.refundPolicies);
      })
    );
  }

  AddRefundPolicy(){
    let addRefund = new Refund_Policy();

    addRefund.refund_Policy_Date = this.AddForm.value.date;
    addRefund.refund_Policy_Version = this.AddForm.value.version;
    addRefund.refund_Policy_Description = this.AddForm.value.description;

    this.service.AddRefundPolicy(addRefund).subscribe(response => {
        this.addPolicySuccessAlert();            
    }, (error) => {
       this.addPolicyErrorAlert();
      console.error('Policy error:', error);
    });
  }

  DeleteRefundPolicy(refund_Policy_ID: number){
    this.service.DeleteRefundPolicy(refund_Policy_ID).subscribe(result => {
      console.log(result);   
      if(result.status == "Success"){
        this.DeletePolicySuccessAlert();            
      }
      else if (result.status == "Error"){
        this.DeletePolicyErrorAlert();
      }     
    })
  }

  reloadPage(){
    window.location.reload()
  }
  
  canceladdmodal() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmaddmodal() {
    this.AddRefundPolicy();    
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  async addPolicySuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Policy Added!',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler:() =>{
            this.reloadPage();
          }
      }],      
    });
    await alert.present();    
  }

  async addPolicyErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Policy Was Not Added.',
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

  async DeletePolicySuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Policy Deleted',
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

  async DeletePolicyErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Policy Was Not Deleted',
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

  
  /*search(){
    //empty array
    this.filteredpolicies = [];

    //filter items
    this.filteredpolicies = this.refundPolicies.filter((searchitem)=>
      searchitem.refund_Policy_Date.toDateString().includes(this.filterTerm)||
      searchitem.refund_Policy_Description.toLocaleLowerCase().includes(this.filterTerm.toLocaleLowerCase())||
      searchitem.refund_Policy_Version == Number(this.filterTerm)
    );
    
  }*/