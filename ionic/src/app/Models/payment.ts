import { Invoice } from "./invoice";

export class Payment{
    Payment_ID!: Number
    Invoice!: Invoice
    Payment_Amount!: Number
}