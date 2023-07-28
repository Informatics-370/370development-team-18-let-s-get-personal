import { Invoice } from "./invoice";

export class Payment{
    payment_ID!: Number
    invoice!: Invoice
    payment_Amount!: Number
}