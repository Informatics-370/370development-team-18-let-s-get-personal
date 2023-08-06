import { UserRole } from "./userrole"
import { Customer } from "./customer"
import { Employee } from "./employee"
import { Admin } from "./admin"
export class User{
    user_ID!: number
    username!: string
    password!: string

    user_Role_ID!: string
    user_Role!: UserRole

    customer!: Customer
    employee!: Employee
    admin!: Admin
}