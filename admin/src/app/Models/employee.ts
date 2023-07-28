import { Title } from "./title";
import { Gender } from "./gender";
import { Address } from "./address";
import { User } from "./user";

export class Employee{
    employee_ID!: Number

    title!: Title
    gender!: Gender
    address!: Address
    user!: User

    firstName!: String
    surname!: String
    cell_Number!: Number
    email!: String
}