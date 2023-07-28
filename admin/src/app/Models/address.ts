import { Province } from "./province";
import { City } from "./city";

export class Address{
    address_ID!: Number
    province_Name!: Province
    city_Name!: City

    street!: String
    number!: Number
    dwelling_Type!: String
    unit_Number!: Number
    area_Code!: Number
}