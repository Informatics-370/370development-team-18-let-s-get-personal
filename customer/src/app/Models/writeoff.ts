import { Employee } from "./employee";
import { Inventory } from "./inventory";
export class Write_Off{
    write_Off_ID!: Number
    inventory_ID!: Number
    Write_Off_Date!: Date

    employee!: Employee
    inventory!: Inventory
    
}