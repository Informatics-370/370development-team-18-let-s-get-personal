import { Inventory_Line_Item } from "./inventorylineitem"
export class Inventory{
    inventory_ID!: number
    inventory_Date!: Date
    inventory_Comments!: String
    
    inventory_Line_Item!: Inventory_Line_Item
}