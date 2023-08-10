import { Customer } from "./customer";
import { Invoice } from "./invoice";
import { DeliveryAddress } from "./deliveryaddress";
export class Order_Request{
    order_Request_ID!: number
    order_Request_Date!: Date
    order_Request_Total_Price!: Number
    isAccepted!: Boolean

    customer_ID!: number
    customer!: Customer
    
    invoice_ID!: string
    invoice!: Invoice

    delivery_Address_ID!: string
    delivery_Address!: DeliveryAddress
}