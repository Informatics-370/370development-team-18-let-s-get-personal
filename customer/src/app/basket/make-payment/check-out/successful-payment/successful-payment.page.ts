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
  cartitems: BasketItems [] = []
  customer: Customer = new Customer()

  constructor(private router:Router, private orderService:OrderService, private saleService: SalesService,
    private auditservice: AuditTrailService, private alertController:AlertController, 
    private profileservice: UserProfileDataService, private invoiceservice: InvoiceService) 
  { }

  ngOnInit() {
    const orderString = localStorage.getItem("order");

    // Parse the JSON string back to an object
    this.order = JSON.parse(orderString as string);
    const price = localStorage.getItem("totalPrice") as string;

    this.order.price = parseFloat(price);
    this.order.customerID = localStorage.getItem("customerID");
    localStorage.removeItem("totalPrice")    
    
    this.placeOrderT(this.order);
    this.addSale();
    this.addInvoice();
    //removing local storage after invoice
  }

  placeOrderT(order:OrderT):void{
    this.orderService.placeOrder(order).subscribe(res=>{
      console.log(res);
    },error=>{
      console.log(error)
    })
  }

  addSale(){
    let addedSale = new Payment();
    let username = JSON.parse(JSON.stringify(localStorage.getItem('username')))

    this.cartitems.forEach(item => {
      addedSale.payment_Amount = item.stock_Item.stock_Item_Price
      addedSale.customer_UserName = username
      addedSale.sale_Quantity = item.basket_Quantity
      addedSale.stock_Item_ID = item.stock_Item.stock_Item_ID
   
      this.saleService.AddSale(addedSale).subscribe(result =>{
        let uploadedPayment = result as Payment;
        console.log(uploadedPayment)
      },(error) => {
        this.ErrorAlert();        
        console.error(error);
      })     
    })

  }

  addInvoice(){   
    const storeddiscountamount: string | null = localStorage.getItem('discount');
    const storeddelprice: string | null = localStorage.getItem('delprice');

    const storedexcvatprice: string | null = localStorage.getItem('pureprice');
    const storedvatamount: string | null = localStorage.getItem('vatamount');
    const storedinclvatprice: string | null = localStorage.getItem('TotalPaid');    

    let customerID = JSON.parse(JSON.stringify(localStorage.getItem('customerID')));

    if (storedinclvatprice !== null && storedexcvatprice !== null && storeddelprice !== null && storedvatamount !== null && storeddiscountamount !== null) {
      let inclvatprice = parseInt(storedinclvatprice, 10)
      let excvatprice = parseInt(storedexcvatprice, 10)
      let delprice = parseInt(storeddelprice, 10)
      let vatamount = parseInt(storedvatamount, 10)
      let discountamount = parseInt(storeddiscountamount, 10)

      let invoice = new Invoice()
      invoice.customer_ID = customerID
      invoice.discount_Amount = discountamount
      invoice.delivery_Price = delprice
      invoice.invoice_Total_exclVAT = excvatprice
      invoice.invoice_Total_VAT = vatamount
      invoice.invoice_Total_inclVAT = inclvatprice
            
      

      console.log(invoice)

      this.invoiceservice.AddInvoice(invoice).subscribe(result => {
          console.log(result)
      },(error) => {      
        console.error( error);
      })

      this.placeOrder();
    }
  }

  private placeOrder():void{
    //Action Trail
    this.action = "Paid For Order"
    this.AddAuditTrail()

      localStorage.removeItem('cart');
      localStorage.removeItem('cartItemCount');
      localStorage.removeItem('quantity');
      localStorage.removeItem('Image-URL');
      localStorage.removeItem('stockId');
      localStorage.removeItem('addressID');
      localStorage.removeItem('deliveryID');
      localStorage.removeItem("order");
      localStorage.removeItem("selectedItem");
      localStorage.removeItem("vatamount");
      localStorage.removeItem("pureprice");
      localStorage.removeItem("totalprice");
      localStorage.removeItem("discount");

      localStorage.removeItem("order");
      // localStorage.removeItem("cart");
      // localStorage.removeItem("orderRequestID");
      // localStorage.removeItem("personalisedID");
      // localStorage.removeItem("totalprice");
      // localStorage.removeItem("deliveryID");
      // //*** */
      // localStorage.removeItem("quantity");
      // localStorage.removeItem("addressID");
      // localStorage.removeItem("cartItemCount");
      // localStorage.removeItem("stockId");
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.showAnimation = true;
    }, 1000);
  }

  redirectToShopping() {
    this.router.navigate(['/']); // Replace 'shopping' with your shopping page route
  } 

//==================== Alerts ====================

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

  async ErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry! ',
      subHeader: '',
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

  //==================== Audit Trail ====================
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

}
//basket = new BasketItems();
//public username: string = ""
  // getUser()
  // {
  //   this.username = JSON.parse(JSON.stringify(localStorage.getItem('username')));
  //   let customer_ID = JSON.parse(JSON.stringify(localStorage.getItem('customerID')));

  //   this.profileservice.GetCustomer(customer_ID).subscribe(result => {
  //     this.customer = result as Customer;
  //     console.log(this.customer)
  //   })

  // }


  /*ngOnInit() {
    this.order = JSON.parse(localStorage.getItem('order') as string)
    //this.order.paid = true;
    this.cartitems = JSON.parse(localStorage.getItem('cart') as string)
    this.getUser()
    this.AddOrderLineItem()
  }*/


  // uploadedOrderLine!: Order_Line_Item;
  // AddOrderLineItem(){
  //   this.cartitems = JSON.parse(localStorage.getItem('cart') as string)
  //   // try
  //   // {
  //     const storedTotalPrice: string | null = localStorage.getItem('totalprice');
  //     const storedQuantity: string | null = localStorage.getItem('cartItemCount');
  //     console.log(storedTotalPrice)
  //     console.log(storedQuantity)

  //     if (storedTotalPrice !== null && storedQuantity !== null) {
  //       let personalisationID = JSON.parse(localStorage.getItem('personalisedID') as string)
  //       let orderRequestID = JSON.parse(localStorage.getItem('orderRequestID') as string)
  //       this.price = parseInt(storedTotalPrice, 10)//JSON.parse(localStorage.getItem('totalprice') as string)
  //       this.quantity = parseInt(storedQuantity, 10)
  //       console.log(orderRequestID)
  //       console.log(this.price)

  //       this.cartitems.forEach(item => {
  //         let addedOrder = new Order_Line_Item()
  //         addedOrder.order_Line_Item_Price = this.price
  //         addedOrder.order_Line_Item_Quantity = item.basket_Quantity
  //         addedOrder.order_request_ID = orderRequestID
  //         addedOrder.personalisation_ID = item.personalization.personalisation_ID
  //         console.log(addedOrder.personalisation_ID)
  //         //item.BasketItems.basket_Quantity

  //         console.log(addedOrder)
  //         this.orderService.AddOrderLineItem(addedOrder).subscribe(result => {
  //           this.uploadedOrderLine = result as Order_Line_Item
  //           this.orderlineitemid = this.uploadedOrderLine.order_Line_Item_ID
  //           console.log(result)
  //         },(error) => {
  //           this.ErrorAlert();        
  //           console.error(error);
  //         })
    
  //         this.addSale()
  //       });
  //     }          
  //   // }
  //   // catch
  //   // {
  //   //   this.ErrorAlert();
  //   // }
  // }

//old add
      
// addedOrder.order_Line_Item_Price = price
// addedOrder.order_Line_Item_Quantity = quantity
// addedOrder.order_request_ID = orderRequestID
// addedOrder.personalisation_ID = personalisedID

// let personalisedID = JSON.parse(localStorage.getItem('personalisedID') as string)
//         let quantity = parseInt(storedQuantity, 10) //JSON.parse(localStorage.getItem('quantity') as string) //this.basket.basket_Quantity

// let addedOrder = new Order_Line_Item

// this.orderService.AddOrderLineItem(addedOrder).subscribe(result => {
//   let orderlineitem = result as Order_Line_Item
//   this.orderlineitemid = orderlineitem.order_Line_Item_ID
//   console.log(result)
// })      
// this.addSale() 
// } 