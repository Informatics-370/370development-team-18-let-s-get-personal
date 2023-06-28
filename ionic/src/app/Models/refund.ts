import { Customer } from "./customer"
import {Refund_Policy} from "./refundpolicy"

export class Refund{
    Refund_ID!: Number
    Customer!: Customer
    Refund_Policy!: Refund_Policy
    Refund_Comment!: String
}