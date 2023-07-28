import { Customer } from "./customer";
import { Employee } from "./employee";
import { Invoice_Discount } from "./invoicediscount";

export class Invoice{
    invoice_ID!: Number
    customer!: Customer
    employee!: Employee
    invoice_Discount!: Invoice_Discount

    delivery_Price!: Number
    invoice_Total_exclVAT!: Number
    invoice_Total_VAT!: Number
    invoice_Total_inclVAT!: Number
}