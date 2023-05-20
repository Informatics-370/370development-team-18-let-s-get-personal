import { DeliveryCompany } from "./deliverycompany"

export class Delivery{
    DeliveryId!: Number
    DeliveryAdress!: String
    DeliveryPrice!: Number
    TrackingNumber!: Number

    DeliveryCompanyId!: Number
    deliverycompany!: DeliveryCompany
}