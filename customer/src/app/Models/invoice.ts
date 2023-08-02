import { Order_Request } from "./orderrequest";
import { Invoice_Discount } from "./invoicediscount";

export class Invoice{
    invoice_ID!: string   
    delivery_Price!: Number
    invoice_Total_exclVAT!: Number
    invoice_Total_VAT!: Number
    invoice_Total_inclVAT!: Number

    order_Request!: Order_Request
    invoice_Discount!: Invoice_Discount
}