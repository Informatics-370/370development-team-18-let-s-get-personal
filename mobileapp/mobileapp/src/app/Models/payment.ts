import { Invoice } from "./invoice";

export class Payment{
    payment_ID!: string
    invoice!: Invoice
    payment_Amount!: Number
    sale_Quantity!: Number 
    sale_Date!: Date
    customer_UserName!: string
    stock_Item_ID!: string
}