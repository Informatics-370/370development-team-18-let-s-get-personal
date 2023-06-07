import { User } from "./user"
import { Gender } from "./Gender"
import { Title } from "./title"
import { Address } from "./address"

export class Customer{  
    Title!: Title
    Gender!: Gender
    Address!: Address
    user!: User

    CustomerId!: number
    FirstName!: String
    Surname!: String
    Cell_Number!: Number
    Email!: String   
}