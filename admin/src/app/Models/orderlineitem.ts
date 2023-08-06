import { Order_Request } from "./orderrequest";
import { Stock_Item } from "./stockitem";
import { Personalisation_Design } from "./personalisationdesign";

export class Order_Line_Item{
    
    order_Line_Item_ID!: number

    order_Request!: Order_Request
    stock_Item!: Stock_Item
    personalisation_Design!: Personalisation_Design

    stock_Item_Size!: string
    order_Line_Item_Price!: Number
    order_Line_Item_Quantity!: Number
    order_Line_Item_Total_Price!: Number
}