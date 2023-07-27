import { Customer } from "./customer";

export class Order_Request{
    Order_Request_ID!: Number
    Customer!: Customer
    Order_Request_Date!: Date
    Order_Request_Total_Price!: Number
    IsAccepted!: Boolean
}