import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule} from '@ionic/angular';
import { Router } from '@angular/router';
import { DeliveryDataService } from '../Services/deliveries.service';
import { Delivery_Company } from '../Models/deliverycompany';
import { StockTypeDataService } from '../Services/stocktype.service';
import { StockTypes } from '../Models/stocktypes';
import { Refund_Policy } from 'src/app/Models/refundpolicy';
import { RefundService } from 'src/app/Services/refund.service';
import { RefundVM } from 'src/app/ViewModels/refundVM';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class FaqPage implements OnInit {
  
  constructor(private _router: Router, public delservice: DeliveryDataService, private typeservice: StockTypeDataService
    ,private service: RefundService,private alertController: AlertController) { }

  ngOnInit() {
    this.getDeliveryCompany()
    this.GetTypes()
    this.GetAllRefundPolicies()
  }
  public ViewRefundPolicy() {
    this._router.navigate(["/tabs/view-refund-policy"])
  }

  public ContactUs() {
    this._router.navigate(["/tabs/contact-us"])
  }

  deliverycompanies:Delivery_Company[]=[];
  getDeliveryCompany(){
    this.delservice.GetDeliveryCompanies().subscribe(result =>{
      this.deliverycompanies = result as Delivery_Company[];
      console.log(this.deliverycompanies)
    })
  }

  stocktypes: StockTypes[] =[];
  GetTypes(){
    this.typeservice.GetStockTypes().subscribe(result => {
      this.stocktypes = result as StockTypes[];
      console.log(this.stocktypes);
    })
  }

  refundPolicy: Refund_Policy[] = [];
  policy: RefundVM[]=[];
  public GetAllRefundPolicies() {
    this.service.GetAllRefundPolicies().subscribe(result => {
      this.policy = result as RefundVM[];
      console.log(this.refundPolicy)
    })
  }

  searchTerm: string = '';
  findString() {
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      
      const found = this.findText(this.searchTerm);
      console.log('word',found)
      if (!found) {
        //alert(`'${this.searchTerm}' not found!`);
        this.WordErrorAlert();
      }
    }
  }

  private findText(str: string): boolean {
    const textNodes = this.getTextNodes(document.body);
    let found = false;

    textNodes.forEach((node) => {
      const content = node.textContent || '';
      const index = content.indexOf(str);
      if (index !== -1) {
        const range = document.createRange();
        range.setStart(node, index);
        range.setEnd(node, index + str.length);
        const sel = window.getSelection();
        

        if(sel){
          sel.removeAllRanges();
        sel.addRange(range);
        
        // Highlight the found text with a yellow background color
        /*const span = document.createElement('span');
        span.style.backgroundColor = 'yellow';
        range.surroundContents(span);*/

        // Scroll to the selected range
        node.parentElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        

        found = true;
        }
      }
    });

    return found;
  }


  private getTextNodes(node: Node): Node[] {
    const textNodes: Node[] = [];
    if (node.nodeType === Node.TEXT_NODE) {
      textNodes.push(node);
    } else {
      node.childNodes.forEach((child) => {
        textNodes.push(...this.getTextNodes(child));
      });
    }
    return textNodes;
    
  }
  async WordErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Sorry!',
      subHeader: 'Word Not Found',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        // handler:() =>{
        //   this.reloadPage();
        // }
      }],
    });
    await alert.present();
  }
}
