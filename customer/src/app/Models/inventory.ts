import { Write_Off } from "./writeoff"
export class Inventory{
    inventory_ID!: Number
    inventory_Date!: Date
    inventory_Comments!: String
    quantityOnHand!: Number

    write_Off!: Write_Off
}