import { Customer } from "./customer";
import { Employee } from "./employee";
import { Invoice_Discount } from "./invoicediscount";

export class Invoice{
    Invoice_ID!: Number
    Customer!: Customer
    Employee!: Employee
    Invoice_Discount!: Invoice_Discount

    Delivery_Price!: Number
    Invoice_Total_exclVAT!: Number
    Invoice_Total_VAT!: Number
    Invoice_Total_inclVAT!: Number
}