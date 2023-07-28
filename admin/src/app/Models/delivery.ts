import { Delivery_Company } from "./deliverycompany"
import { Address } from "./address"

export class Delivery{
    delivery_ID!: Number
    delivery_Company!: Delivery_Company
    delivery_Address!: Address

    delivery_Price!: Number
    tracking_Number!: Number

}