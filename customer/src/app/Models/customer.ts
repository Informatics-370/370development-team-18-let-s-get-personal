import { User } from "./user"
import { Title } from "./title"
import { Address } from "./address"
import { BasketItems } from "./basket"

export class Customer{  
    customer_ID!: Number

    title!: Title
    address!: Address
    user!: User
    
    username!: String
    firstName!: String
    surname!: String
    cell_Number!: Number
    email!: String   

    basket!: BasketItems
}