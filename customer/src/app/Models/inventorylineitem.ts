import { Inventory } from "./inventory"
import { Stock_Item } from "./stockitem"

export class Inventory_Line_Item{
    inventory_Line_Item_ID!: Number
    inventory!: Inventory
    stock_Item!: Stock_Item
    inventory_Line_Quantity!: Number
}