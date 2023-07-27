import { Inventory } from "./inventory"
import { Stock_Item } from "./stockitem"
export class Inventory_Line_Item{
    Inventory_Line_Item_ID!: Number
    Inventory!: Inventory
    Stock_Item!: Stock_Item
    Inventory_Line_Quantity!: Number
}