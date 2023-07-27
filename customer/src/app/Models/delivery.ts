import { Delivery_Company } from "./deliverycompany"
import { Address } from "./address"

export class Delivery{
    Delivery_ID!: Number
    Delivery_Address!: Address
    Delivery_Company!: Delivery_Company

    Delivery_Price!: Number
    Tracking_Number!: Number

}