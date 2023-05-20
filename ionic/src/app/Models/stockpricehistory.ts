import { StockItem } from "./stockitem"
export class StockPriceHistory{
    StockPriceHistoryId!: number
    StockPriceAmount!: number 
    EffectiveFromDate!: Date
    EffectiveToDate!: Date

    StockItemId!: Number
    stockitems!: StockItem
}