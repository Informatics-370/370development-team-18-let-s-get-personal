import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SalesService } from 'src/app/Services/sales.service';
import { OrderService } from 'src/app/Services/order.service';
import { BasketItems, OrderT } from 'src/app/Models/basket';
import { Order_Line_Item } from 'src/app/Models/orderlineitem';
import { Payment } from 'src/app/Models/payment';
import { AuditTrail } from 'src/app/Models/audittrail';
import { AuditTrailService } from 'src/app/Services/audittrail.service';
import { Invoice } from 'src/app/Models/invoice'
import { UserProfileDataService } from 'src/app/Services/userprofile.service';
import { Customer } from 'src/app/Models/customer';
import { InvoiceService } from 'src/app/Services/invoice.service';

@Component({
  selector: 'app-successful-payment',
  templateUrl: './successful-payment.page.html',
  styleUrls: ['./successful-payment.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SuccessfulPaymentPage implements OnInit {
  showAnimation = false;
  order = new OrderT();
  cartitems: any 
  basket = new BasketItems();
  customer: Customer = new Customer()
  public username: string = ""
  constructor(private router:Router, private orderService:OrderService, private saleService: SalesService,
    private auditservice: AuditTrailService, private alertController:AlertController, private profileservice: UserProfileDataService,
    private invoiceservice: InvoiceService) 
  { }

  ngOnInit() {
    this.order = JSON.parse(localStorage.getItem('order') as string)
    this.order.paid=true;
    this.cartitems = JSON.parse(localStorage.getItem('cart') as string)
    this.getUser()
    this.AddOrderLineItem()
  }

  //Process: 1. Add to orderline, 2. add to payment, 3. add and send invoice, 
  //4. remove info from local storage, 5. add audit trail

  orderlineitemid!: string
  AddOrderLineItem(){
    try
    {
      let addedOrder = new Order_Line_Item
      let orderRequestID = JSON.parse(localStorage.getItem('orderRequestID') as string)
      let personalisedID = JSON.parse(localStorage.getItem('personalisedID') as string)
      let quantity = JSON.parse(localStorage.getItem('quantity') as string) //this.basket.basket_Quantity
      let price = JSON.parse(localStorage.getItem('totalprice') as string)

      addedOrder.order_Line_Item_Price = price
      addedOrder.order_Line_Item_Quantity = quantity
      addedOrder.order_request_ID = orderRequestID
      addedOrder.personalisation_ID = personalisedID

      this.orderService.AddOrderLineItem(addedOrder).subscribe(result => {
        let orderlineitem = result as Order_Line_Item
        this.orderlineitemid = orderlineitem.order_Line_Item_ID
        console.log(result)
      })

      this.addSale()      
    }
    catch
    {
      
    }
  }

  paymentID!: string
  addSale(){    
    let addedSale = new Payment();
    let price = JSON.parse(localStorage.getItem('totalprice') as string)
    let username = JSON.parse(JSON.stringify(localStorage.getItem('username')))
    let quantity = JSON.parse(localStorage.getItem('quantity') as string)
    let stockitem = JSON.parse(JSON.stringify(localStorage.getItem('stockId')));

    addedSale.payment_Amount = price
    addedSale.customer_UserName = username
    addedSale.sale_Quantity = quantity
    addedSale.stock_Item_ID = stockitem

    try{

      this.saleService.AddSale(addedSale).subscribe(result =>{
        let sale = result as Payment;
        this.paymentID = sale.payment_ID
        console.log(result)
      })

      this.addInvoice()
      //this.placeOrder(this.order);
    }
    catch{

    }
  }

  addInvoice(){
    let inclvatprice = JSON.parse(localStorage.getItem('totalprice') as string)
    let excvatprice = JSON.parse(localStorage.getItem('pureprice') as string)
    let delprice = JSON.parse(localStorage.getItem('delprice') as string)
    let vatamount = JSON.parse(localStorage.getItem('vatamount') as string)
    let discountamount = JSON.parse(localStorage.getItem('discountamount') as string)

    let invoice = new Invoice()
    invoice.delivery_Price = delprice
    invoice.invoice_Total_exclVAT = excvatprice
    invoice.invoice_Total_VAT = vatamount
    invoice.invoice_Total_inclVAT = inclvatprice
    invoice.discount_Amount = discountamount
    invoice.payment_ID = this.paymentID
    invoice.order_Line_Item_ID = this.orderlineitemid

    invoice.customer.customer_ID = this.customer.customer_ID
    invoice.customer.email = this.customer.email
    invoice.customer.firstName = this.customer.firstName
    invoice.customer.surname = this.customer.surname
    invoice.customer.username = this.customer.username
    invoice.customer.cell_Number = this.customer.cell_Number


    try{
      this.invoiceservice.AddInvoice(invoice).subscribe(result => {
        console.log(result)
      })

      this.placeOrder(this.order);
    }
    catch{

    }
  }

  getUser()
  {
    this.username = JSON.parse(JSON.stringify(localStorage.getItem('username')));
    let customer_ID = JSON.parse(JSON.stringify(localStorage.getItem('customerID')));

    this.profileservice.GetCustomer(customer_ID).subscribe(result => {
      this.customer = result as Customer;
      console.log(this.customer)
    })

  }

  private placeOrder(order:OrderT):void{
    //Action Trail
    this.action = "Paid For Order"
    this.AddAuditTrail()

      localStorage.removeItem("order");
      localStorage.removeItem("cart");
      localStorage.removeItem("orderRequestID");
      localStorage.removeItem("personalisedID");
      localStorage.removeItem("totalprice");
      localStorage.removeItem("deliveryID");
      //*** */
      localStorage.removeItem("quantity");
      localStorage.removeItem("addressID");
      localStorage.removeItem("cartItemCount");
      localStorage.removeItem("stockId");
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.showAnimation = true;
    }, 1000);
  }

  redirectToShopping() {
    this.router.navigate(['/']); // Replace 'shopping' with your shopping page route
  }

//========= Audit Trail ========
  action!: string
  AddAuditTrail(){
    let customer_ID = JSON.parse(JSON.stringify(localStorage.getItem('customerID')))
    let audittrail = new AuditTrail()
    audittrail.customer_ID = customer_ID
    audittrail.actionName = this.action

    this.auditservice.AddCustomerAuditTrail(audittrail).subscribe(result => {
      console.log(result)
    })
  }

  public ContactUs() {
    this.router.navigate(["/tabs/contact-us"])
  }

  async SuccessPaymentTip() {
    const alert = await this.alertController.create({
      header: 'Congrats! You have placed an order with us',
      subHeader: 'If you are have any issues or questions please contact us on our contact us page.',
      message:'',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        // handler: () => {
        //   this.reloadPage();
        // }
      },{
        text: 'Contact Us',
        //role: 'cancel',
        handler: () => {
          this.ContactUs();
        }
      }],
    });
    await alert.present();
  }

}
