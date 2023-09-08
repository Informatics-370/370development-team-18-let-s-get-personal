import { Customer } from "./customer"
import { Stock_Item } from "./stockitem"

export class ProductRating{
    product_Rating_ID!: string
    //customer!: Customer
    customer_ID!:String;
    stock_Item!: Stock_Item
    stock_Item_ID!: string
    product_Star_Rating!: Number 
    product_Rating_Comments!: String
}