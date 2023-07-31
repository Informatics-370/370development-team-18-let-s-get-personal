import { Stock_Item } from "./stockitem"
import { BasketItems } from "./basket"
export class Stock_Image{
    stock_Image_ID!: Number
    stock_Image_File!: String 
    stock_Item_Id!: Number

    stock_Item!: Stock_Item
    basket!: BasketItems
}