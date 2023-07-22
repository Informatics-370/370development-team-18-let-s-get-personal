import { StockItemColours } from "./stockitemcolour"
import { ProductRating } from "./productrating"
import { Stock_Image } from "./stockimage"

export interface  Stock_Item{
    Stock_Item_ID: Number
    Stock_Item_Name: String 

    stockimage: Stock_Image
    productrating: ProductRating
    stockitemcolours: StockItemColours
    isSelected: Boolean
}