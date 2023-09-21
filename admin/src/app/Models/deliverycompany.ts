import{Delivery} from './delivery'
import{DeliveryViewModel} from '../ViewModels/deliveryVM'
export class Delivery_Company{
    delivery_Company_ID!: string
    delivery_Company_Name!: string
    delivery_Price!: number

    companycontrolbreak!: DeliveryViewModel[]
    delivery!: Delivery
    delivery_Company_Total: number = 0;
}

// controlbreak!: SalesVM[];
//     stock_Item!: Stock_Item