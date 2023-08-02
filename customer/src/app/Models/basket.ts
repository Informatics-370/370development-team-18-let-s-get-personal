import { Stock_Item } from 'src/app/Models/stockitem';
import { Customer } from './customer';

export class BasketItems {
    basket_ID! : string
    basket_Quantity!: number
    basket_Price!: number
    stock_Item_ID!: number
    stock_Item!: Stock_Item

    customer!: Customer
    customer_ID!: number;
}