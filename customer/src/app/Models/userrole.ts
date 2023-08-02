import { UserRolePermission } from "./userrolepermission"
import { User } from "./user"
export class UserRole{
    user_Role_ID!: string
    user_Role_Name!: string

    user_Role_Permission!: UserRolePermission
    user!: User
}