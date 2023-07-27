import { Province } from "./province";
import { City } from "./city";

export class Address{
    Address_ID!: Number
    Province_Name!: Province
    City_Name!: City

    Street!: String
    Number!: Number
    Dwelling_Type!: String
    Unit_Number!: Number
    Area_Code!: Number
}