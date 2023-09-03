import { StockItemColours } from "./stockitemcolour"
import { ProductRating } from "./productrating"
import { Stock_Image } from "./stockimage"
import { StockTypes } from "./stocktypes"
import { Best_Sellers } from "./bestsellers"
import { BasketItems } from "./basket"
import { StockPriceHistory } from "./stockpricehistory"
export class  Stock_Item{
    stock_Item_ID!: string
    stock_Item_Name!: String 
    stock_Item_Price!: Number
    stock_Item_Size!: string
    inventory_Date!: Date
    inventory_Comments!: String 
    stock_Item_Quantity!: number

    stock_Type_ID!: string
    stock_Types!: StockTypes

    stock_Image_ID!: string
    stock_Images!: Stock_Image


    stock_Item_Colour_ID!: string
    stock_Item_Colour!: StockItemColours

    BestSellers!:Best_Sellers
    Basket!:BasketItems
    productrating!: ProductRating
    Stock_Price_History!:StockPriceHistory
}