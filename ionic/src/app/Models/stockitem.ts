import { StockItemColours } from "./stockitemcolour"
import { ProductRating } from "./productrating"
import { StockImage } from "./stockimage"
export interface  StockItem{
    StockItemId: number
    StockItemName: string 
    Description: string

    StockItemColourId: number
    StockItemTypeId: number
    StockImageId: number

    stockimage: StockImage
    productrating: ProductRating
    stockitemcolours: StockItemColours
}