import { Write_Off } from "./writeoff";
import { Stock_Item } from "./stockitem";

export class Write_Off_Line_Item{
    write_Off_Line_Item_ID!: Number
    write_Off_Quantity!: Number
    write_Off_Reason!: String

    write_Off!: Write_Off
    stock_Item!: Stock_Item    
}