import { Order_Request } from "./orderrequest"
import { Order_Status } from "./orderstatus"

export class Order{

    orderId!: number

    order_Request!: Order_Request
    order_Status!: Order_Status

    order_Notes!: string 
    order_Date!: Date
}