import { Stock_Item } from "../Models/stockitem"

export class PersonalisationDesignVM{
    personalization_Id!:string
    image_File!: string
    //image_Price_amount!: number

    design_Text!: string
    // text_Price_Amount!: number

    stock_Item_Name!: string
    stock_Item_Price!: number
    stock_Item_Size!: string
    stock_Colour_Name!: string
    personalisation_Design_Price!: number

    design_Text_ID!: string
    design_Image_ID!: string
    stock_Item_ID!: string 
}