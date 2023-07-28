import { StockItemColours } from "./stockitemcolour"
import { ProductRating } from "./productrating"
import { Stock_Image } from "./stockimage"
import { StockTypes } from "./stocktypes"

export class  Stock_Item{
    stock_Item_ID!: Number
    stock_Item_Name!: String 
    stock_Item_Price!: Number

    stock_Types!: StockTypes
    stock_Images!: Stock_Image
    productrating!: ProductRating
    stockitemcolours!: StockItemColours
    isSelected!: Boolean
}