import { UserRole } from "./userrole"
import { Permission } from "./permission"
export class UserRolePermission{
    user_Role_Permission_ID!: string
    
    user_Role_ID!: string
    user_Role!: UserRole

    permission_ID!: string 
    permission!: Permission
}