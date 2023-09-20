import { SalesVM } from "../ViewModels/salesVM";
import { Stock_Item } from "./stockitem";
export class StockTypes{
    stock_Type_ID!: string
    stock_Type_Name!: string
    stock_Type_Total: number = 0;
    controlbreak!: SalesVM[];
    stock_Item!: Stock_Item
}