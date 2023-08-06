import { Inventory } from "./inventory"
import { Stock_Item } from "./stockitem"

export class Inventory_Line_Item{
    inventory_Line_Item_ID!: number    
    inventory_Line_Quantity!: Number

    inventory!: Inventory
    inventory_ID!: string

    stock_Item!: Stock_Item
    stock_Item_ID!: string
}