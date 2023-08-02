import { Invoice } from "./invoice";

export class Payment{
    payment_ID!: string
    invoice!: Invoice
    payment_Amount!: Number
}