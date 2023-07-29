import { Stock_Item } from "./stockitem"
export class StockPriceHistory{

    stock_Price_History_ID!: String
    stock_Price_Amount!: Number 
    effective_From_Date!: Date
    effective_To_Date!: Date

    stockItemId!: Number
    stock_Item!: Stock_Item
}