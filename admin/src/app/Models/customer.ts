import { User } from "./user"
import { Gender } from "./gender"
import { Title } from "./title"
import { Address } from "./address"
import { BasketItems } from "./basket"
export class Customer{  
    customer_ID!: Number

    title!: Title
    gender!: Gender
    address!: Address
    user!: User
    
    firstName!: String
    surname!: String
    cell_Number!: Number
    email!: String   

    basket!: BasketItems
}