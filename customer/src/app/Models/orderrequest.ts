import { Customer } from "./customer";

export class Order_Request{
    order_Request_ID!: Number

    customer!: Customer
    order_Request_Date!: Date
    order_Request_Total_Price!: Number
    isAccepted!: Boolean
}