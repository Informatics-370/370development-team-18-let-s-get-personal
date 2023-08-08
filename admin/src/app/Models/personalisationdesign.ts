import { Design_Image } from "./designimage";
import { Design_Text } from "./designtext";

export class Personalisation_Design{
    personalisation_Design_ID!: number

    design_Image!: Design_Image
    design_Text!: Design_Text

    itemColour!: String
    designText!: String
    textPosition!: String
    textColour!: String
    personalisation_Design_Price!: Number
}