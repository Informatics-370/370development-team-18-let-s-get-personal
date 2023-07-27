import { Write_Off } from "./writeoff";
import { Order_Request } from "./orderrequest";
import { Stock_Item } from "./stockitem";
import { Personalisation_Design } from "./personalisationdesign";

export class Order_Line_Item{
    Order_Line_Item_ID!: Number

    Write_Off!: Write_Off
    Order_Request!: Order_Request
    Stock_Item!: Stock_Item
    Personalisation_Design!: Personalisation_Design

    Order_Line_Item_Price!: Number
    Order_Line_Item_Quantity!: Number
    Order_Line_Item_Total_Price!: Number
}