import { Inventory_Line_Item } from "./inventorylineitem"
export class Inventory{
    inventory_ID!: string
    inventory_Date!: Date
    inventory_Comments!: String
    
    inventory_Line_Item!: Inventory_Line_Item
}