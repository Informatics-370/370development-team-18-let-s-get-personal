import { Stock_Item } from 'src/app/Models/stockitem';
import { Customer } from './customer';
import { PersonalisationDesignVM } from '../ViewModels/personalisationdesignVM';
import { DeliveryAddress } from './deliveryaddress';

/*export class BasketItems {
    basket_ID! : number
    basket_Quantity!: number
     personalization:Personalization = new Personalization();
    stock_Item_ID!: number
    stock_Item!: Stock_Item

    customer!: Customer
    customer_ID!: number;
}

export class Personalization{
    personalisation_ID!: string
    personalizationText!:string;
    img!:string;
}*/

export class Personalization{
    personalisation_ID!: string
    img!: string | null;
    personalizationText!: string
}


export class BasketItems{
    stock_Item!: Stock_Item;
    basket_Quantity!: Number;
    personalization:Personalization = new Personalization();
}

export class OrderT{
    basketItems!: BasketItems[];
    deliveryAddress:DeliveryAddress = new DeliveryAddress();
    deliveryCompanyID:any;
    customerID!:any;
    paid!:boolean;
    deliveryPrice!:any;
    price!:number;
}


