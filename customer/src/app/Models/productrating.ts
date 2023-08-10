import { Customer } from "./customer"
import { Stock_Item } from "./stockitem"

export class ProductRating{
    product_Rating_ID!: number
    customer!: Customer
    stock_Item!: Stock_Item

    product_Star_Rating!: Number 
    product_Rating_Comments!: String
}