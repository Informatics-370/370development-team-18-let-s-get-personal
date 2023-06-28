import { Stock_Item } from "./stockitem"
export class StockPriceHistory{

    Stock_Price_History_ID!: number
    Stock_Price_Amount!: number 
    Effective_From_Date!: Date
    Effective_To_Date!: Date

    StockItemId!: Number
    Stock_Item!: Stock_Item
}