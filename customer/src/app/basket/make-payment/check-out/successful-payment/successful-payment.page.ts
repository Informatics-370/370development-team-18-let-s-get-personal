import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
//import { OrderT } from 'src/app/Models/basket';
import { OrderService } from 'src/app/Services/order.service';
import { BasketItems, OrderT } from 'src/app/Models/basket';
import { Order_Line_Item } from 'src/app/Models/orderlineitem';

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
<<<<<<< HEAD
  cartitems: any 
  basket = new BasketItems();
  constructor(private router:Router,private orderService:OrderService) { }
=======
  cartitems: any [] = []
  //basket = new BasketItems();
  customer: Customer = new Customer()
  public username: string = ""

  price: number = 0
  quantity: number = 0
  orderlineitemid!: string

  constructor(private router:Router, private orderService:OrderService, private saleService: SalesService,
    private auditservice: AuditTrailService, private alertController:AlertController, private profileservice: UserProfileDataService,
    private invoiceservice: InvoiceService) 
  { }
>>>>>>> developer

  ngOnInit() {

    const orderString = localStorage.getItem("order");

    // Parse the JSON string back to an object
    this.order = JSON.parse(orderString as string);
    const price=localStorage.getItem("totalPrice") as string;

    this.order.price=parseFloat(price);
    this.order.customerID=localStorage.getItem("customerID");
    localStorage.removeItem("totalPrice")

    this.placeOrderT(this.order);

  }

  placeOrderT(order:OrderT):void{
    this.orderService.placeOrder(order).subscribe(res=>{
      console.log(res);
    },error=>{
      console.log(error)
    })
  }

  /*ngOnInit() {
    this.order = JSON.parse(localStorage.getItem('order') as string)
<<<<<<< HEAD
    this.order.paid=true;
    //this.placeOrder(this.order)
    this.cartitems = JSON.parse(localStorage.getItem('cart') as string)//localStorage.setItem('cart', JSON.stringify(this.cartItems));
=======
    //this.order.paid = true;
    this.cartitems = JSON.parse(localStorage.getItem('cart') as string)
    this.getUser()
>>>>>>> developer
    this.AddOrderLineItem()
  }*/

<<<<<<< HEAD
  // public removeItemFromBasket(id: any):void {
  //   this.cartItems = this.cartItems.filter((cartItem) => cartItem.stock_Item.stock_Item_ID !== id);
  //   localStorage.setItem('cart', JSON.stringify(this.cartItems));
  // }

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

      })

      this.placeOrder(this.order);
    }
    catch
    {

    }
  }

  private placeOrder(order:OrderT):void{
    //this.orderService.placeOrder(order).subscribe(res=>{
=======
  //Process: 1. Add to orderline, 2. add to payment, 3. add and send invoice, 
  //4. remove info from local storage, 5. add audit trail
  
  getUser()
  {
    this.username = JSON.parse(JSON.stringify(localStorage.getItem('username')));
    let customer_ID = JSON.parse(JSON.stringify(localStorage.getItem('customerID')));

    this.profileservice.GetCustomer(customer_ID).subscribe(result => {
      this.customer = result as Customer;
      console.log(this.customer)
    })

  }

  uploadedOrderLine!: Order_Line_Item;
  AddOrderLineItem(){
    // try
    // {
      const storedTotalPrice: string | null = localStorage.getItem('totalprice');
      const storedQuantity: string | null = localStorage.getItem('cartItemCount');
      console.log(storedTotalPrice)
      console.log(storedQuantity)

      if (storedTotalPrice !== null && storedQuantity !== null) {
        let personalisationID = JSON.parse(localStorage.getItem('personalisedID') as string)
        let orderRequestID = JSON.parse(localStorage.getItem('orderRequestID') as string)
        this.price = parseInt(storedTotalPrice, 10)//JSON.parse(localStorage.getItem('totalprice') as string)
        this.quantity = parseInt(storedQuantity, 10)
        console.log(orderRequestID)
        console.log(this.price)

        this.cartitems.forEach(item => {
          let addedOrder = new Order_Line_Item()
          addedOrder.order_Line_Item_Price = this.price
          addedOrder.order_Line_Item_Quantity = item.basket_Quantity
          addedOrder.order_request_ID = orderRequestID
          addedOrder.personalisation_ID = item.personalization.personalisation_ID
          console.log(addedOrder.personalisation_ID)
          //item.BasketItems.basket_Quantity

          console.log(addedOrder)
          this.orderService.AddOrderLineItem(addedOrder).subscribe(result => {
            this.uploadedOrderLine = result as Order_Line_Item
            this.orderlineitemid = this.uploadedOrderLine.order_Line_Item_ID
            console.log(result)
          },(error) => {
            this.ErrorAlert();        
            console.error(error);
          })
    
          this.addSale()
        });
      }          
    // }
    // catch
    // {
    //   this.ErrorAlert();
    // }
  }

  paymentID!: string
  uploadedPayment!: Payment;
  addSale(){    
    const storedPurePrice: string | null = localStorage.getItem('pureprice');
    if (storedPurePrice !== null ){
      let totalsaleprice = parseInt(storedPurePrice, 10)
      let addedSale = new Payment();
      let username = JSON.parse(JSON.stringify(localStorage.getItem('username')))
      let stockitem = JSON.parse(JSON.stringify(localStorage.getItem('stockId')));

      this.cartitems.forEach(item => {
        addedSale.payment_Amount = totalsaleprice
        addedSale.customer_UserName = username
        addedSale.sale_Quantity = item.basket_Quantity
        addedSale.stock_Item_ID = item.stock_Item.stock_Item_ID
   
        this.saleService.AddSale(addedSale).subscribe(result =>{
          this.uploadedPayment = result as Payment;
          this.paymentID = this.uploadedPayment.payment_ID
          console.log(result)
          console.log(this.paymentID)
          this.addInvoice()
        },(error) => {
          this.ErrorAlert();        
          console.error(error);
        })
      })     
    }
    

  }

  addInvoice(){
    const storedinclvatprice: string | null = localStorage.getItem('totalprice');
    const storedexcvatprice: string | null = localStorage.getItem('pureprice');
    const storeddelprice: string | null = localStorage.getItem('delprice');
    const storedvatamount: string | null = localStorage.getItem('vatamount');
    const storeddiscountamount: string | null = localStorage.getItem('discount');

    if (storedinclvatprice !== null && storedexcvatprice !== null && storeddelprice !== null && storedvatamount !== null && storeddiscountamount !== null) {
      //this.price = parseInt(storedTotalPrice, 10)
      let inclvatprice = parseInt(storedinclvatprice, 10)
      let excvatprice = parseInt(storedexcvatprice, 10)
      let delprice = parseInt(storeddelprice, 10)
      let vatamount = parseInt(storedvatamount, 10)
      let discountamount = parseInt(storeddiscountamount, 10)

      let invoice = new Invoice()
      invoice.delivery_Price = delprice
      invoice.invoice_Total_exclVAT = excvatprice
      invoice.invoice_Total_VAT = vatamount
      invoice.invoice_Total_inclVAT = inclvatprice
      invoice.discount_Amount = discountamount
      invoice.payment_ID = this.paymentID //this.uploadedPayment.payment_ID //
      invoice.order_Line_Item_ID = this.uploadedOrderLine.order_Line_Item_ID //this.orderlineitemid
      let customer_ID = JSON.parse(JSON.stringify(localStorage.getItem('customerID')));
      
      // let customer = new Customer()
      // 
      // customer.customer_ID = this.customer.customer_ID
      // customer.email = this.customer.email
      // customer.firstName = this.customer.firstName
      // customer.surname = this.customer.surname
      // customer.username = this.customer.username
      // customer.cell_Number = this.customer.cell_Number

      // invoice.customer = customer

      console.log(invoice)

      this.invoiceservice.AddInvoice(invoice).subscribe(result => {
          console.log(result)
      },(error) => {
        //this.editErrorAlert();        
        console.error( error);
      })

      this.placeOrder(); //this.order
    }
  }

  private placeOrder():void{ //order:OrderT
    //Action Trail
    this.action = "Paid For Order"
    this.AddAuditTrail()

>>>>>>> developer
      localStorage.removeItem("order");
      localStorage.removeItem("cart");
      localStorage.removeItem("orderRequestID");
      localStorage.removeItem("personalisedID");
      localStorage.removeItem("totalprice");
      localStorage.removeItem("deliveryID");
      //console.log(res);
    // },err=>{
    //   console.log(err);
    //   localStorage.removeItem("order");
    //   localStorage.removeItem("cart"); 
    // })
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.showAnimation = true;
    }, 1000);
  }

  redirectToShopping() {
    this.router.navigate(['/']); // Replace 'shopping' with your shopping page route
  }

<<<<<<< HEAD
=======
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

>>>>>>> developer
}

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