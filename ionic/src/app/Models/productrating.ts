import { Customer } from "./customer"
import { Stock_Item } from "./stockitem"

export class ProductRating{
    Product_Rating_ID!: Number
    Customer!: Customer
    Stock_Item!: Stock_Item

    Product_Star_Rating!: Number 
    Product_Rating_Comments!: String
}