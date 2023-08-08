import { Invoice } from "./invoice";

export class Payment{
    payment_ID!: number
    invoice!: Invoice
    payment_Amount!: Number
}