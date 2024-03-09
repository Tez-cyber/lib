export interface IUser {
    type: "ADMIN" | "EMPLOYEE" | "PATREON",
    firstName: string
    lastName: string
    email: string
    password: string
}