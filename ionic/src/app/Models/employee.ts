import { Title } from "./title";
import { Gender } from "./gender";
import { Address } from "./address";
import { User } from "./user";

export class Employee{
    Employee_ID!: Number

    Title!: Title
    Gender!: Gender
    Address!: Address
    User!: User

    FirstName!: String
    Surname!: String
    Cell_Number!: Number
    Email!: String
}