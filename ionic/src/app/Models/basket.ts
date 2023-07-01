import { Stock_Item } from 'src/app/Models/stockitem';

export class BasketItem {
    stockItem!: Stock_Item;
    quantity!: number;
    price!: number;
}