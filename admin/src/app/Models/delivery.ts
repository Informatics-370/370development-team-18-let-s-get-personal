import { Delivery_Company } from "./deliverycompany"
import { DeliveryAddress } from "./deliveryaddress"

export class Delivery{
    delivery_ID!: string
    delivery_Price!: number
    tracking_Number!: number

    dateDelivered!: Date

    delivery_Address_ID!: string    
    delivery_Address!: DeliveryAddress

    delivery_Company_ID!: string
    delivery_Company!: Delivery_Company
}