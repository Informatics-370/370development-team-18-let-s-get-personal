import { Customer } from '../Models/customer';
export class Invoice{
    invoice_ID!: string  

    customer!: Customer
    order_Line_Item_ID!: string
    payment_ID!: string

    discount_Amount!: number
    delivery_Price!: Number
    invoice_Total_exclVAT!: Number
    invoice_Total_VAT!: Number
    invoice_Total_inclVAT!: Number
}