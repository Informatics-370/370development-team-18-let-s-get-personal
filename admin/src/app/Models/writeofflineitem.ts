import { Write_Off } from "./writeoff";
import { Stock_Item } from "./stockitem";

export class Write_Off_Line_Item{
    Write_Off_Line_Item_ID!: Number

    Write_Off!: Write_Off
    Stock_Item!: Stock_Item

    Write_Off_Quantity!: Number
    Write_Off_Reason!: String
}