import { User } from "./user"
import { Gender } from "./gender"
import { Title } from "./title"
import { Address } from "./address"

export class Customer{  
    Title!: string
    Gender!: string
    Address!: Address
    FirstName!: string
    Surname!: string
    Cell_Number!: string
    Email!: string   
}