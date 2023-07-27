import { StockItemColours } from "./stockitemcolour"
import { ProductRating } from "./productrating"
import { Stock_Image } from "./stockimage"

export class  Stock_Item{
    Stock_Item_ID!: Number
    Stock_Item_Name!: String 
    Stock_Item_Price!: Number

    stockimage!: Stock_Image
    productrating!: ProductRating
    stockitemcolours!: StockItemColours
    isSelected!: Boolean
}