import { Design_Image } from "./designimage";
import { Design_Text } from "./designtext";
import { Stock_Item } from "./stockitem";

export class Personalisation_Design {
    personalisation_Design_ID!: string
    design_Image!: string
    // design_Image!: Design_Image
    //design_Text!: Design_Text
    stock_Item!: Stock_Item

    //itemColour!: String
    designText!: String
    //textPosition!: String
    //textColour!: String
    //personalisation_Design_Price!: Number
}