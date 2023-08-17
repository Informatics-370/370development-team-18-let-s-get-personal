import { Delivery_Company } from "./deliverycompany"
import { DeliveryAddress } from "./deliveryaddress"

export class Delivery{
    delivery_ID!: string
    delivery_Price!: Number
    tracking_Number!: Number
    delivery_Address_ID!: string
    delivery_Company_ID!: string
}