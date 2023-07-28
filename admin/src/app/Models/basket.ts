import { Stock_Item } from 'src/app/Models/stockitem';
import { Customer } from './customer';

export class BasketItems {
    basket_ID! : Number
    basket_Quantity!: number;
    stock_Item_ID!: number
    stock_Image_ID!: number

    stock_Item!: Stock_Item;
    customer!: Customer
    price!: number;
}