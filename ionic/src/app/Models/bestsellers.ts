import { StockItemColours } from "./stockitemcolour"
import { ProductRating } from "./productrating"
import { Stock_Image } from "./stockimage"
import { Stock_Item } from "./stockitem"

export interface Best_Sellers{
    Best_Sellers_ID: Number
    Stock_Item_Name: Stock_Item 

    stockimage: Stock_Image
    productrating: ProductRating
    stockitemcolours: StockItemColours
}