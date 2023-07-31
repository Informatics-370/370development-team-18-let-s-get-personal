import { Delivery_Company } from "./deliverycompany"
import { Order_Line_Item } from "./orderlineitem"

export class Delivery{
    delivery_ID!: Number
    delivery_Company!: Delivery_Company
    order_line_Item!: Order_Line_Item
    delivery_Price!: Number
    tracking_Number!: Number
}