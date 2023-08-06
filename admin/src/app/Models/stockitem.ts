import { StockItemColours } from "./stockitemcolour"
import { ProductRating } from "./productrating"
import { Stock_Image } from "./stockimage"
import { StockTypes } from "./stocktypes"
import { Best_Sellers } from "./bestsellers"
import { BasketItems } from "./basket"
import { Inventory_Line_Item } from "./inventorylineitem"
import { StockPriceHistory } from "./stockpricehistory"
export class  Stock_Item{
    stock_Item_ID!: number
    stock_Item_Name!: String 
    stock_Item_Price!: Number
    stock_Item_Size!: string

    stock_Type_ID!: string
    stock_Types!: StockTypes

    stock_Image_ID!: string
    stock_Images!: Stock_Image


    stock_Item_Colour_ID!: string
    stock_Item_Colour!: StockItemColours

    BestSellers!:Best_Sellers
    Basket!:BasketItems
    productrating!: ProductRating
    Inventory_Line_Item!:Inventory_Line_Item
    Stock_Price_History!:StockPriceHistory
}