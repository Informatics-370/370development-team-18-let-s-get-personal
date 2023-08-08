import { Stock_Item } from "./stockitem"
export class StockPriceHistory{

    stock_Price_History_ID!: number
    stock_Price_Amount!: Number 
    effective_From_Date!: Date
    effective_To_Date!: Date

    stock_Item_ID!: string
    stock_Item!: Stock_Item
}