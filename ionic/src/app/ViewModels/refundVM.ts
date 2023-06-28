import { Customer } from "../Models/customer"
import { Refund_Policy } from "../Models/refundpolicy"
export class RefundVM{
    
    Customer!: Customer
    Refund_Policy!: Refund_Policy

    Customer_ID!: Number
    Refund_Comment!: String
    Refund_Reason!: String
    Refund_Status!: String
}