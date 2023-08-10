import { Delivery_Company } from "./deliverycompany"
import { DeliveryAddress } from "./deliveryaddress"

export class Delivery{
    delivery_ID!: number
    delivery_Price!: Number
    tracking_Number!: Number

    delivery_Address_ID!: string    
    delivery_Address!: DeliveryAddress

    delivery_Company_ID!: string
    delivery_Company!: Delivery_Company
}