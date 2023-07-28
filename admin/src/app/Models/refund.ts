import { Customer } from "./customer"
import { Refund_Policy } from "./refundpolicy"

export class Refund{
    refund_ID!: Number    
    customer!: Customer
    customer_Email!: string
    refund_Policy!: Refund_Policy
    refund_Comment!: String
    refund_Status!: String
}