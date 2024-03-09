import bcrypt from "bcrypt"

import { config } from "../config"

import UserDaos, {IUserModel} from "../daos/UserDaos"
import { IUser } from "../models/User"

export async function register(user: IUser): Promise<IUserModel> {
    const ROUNDS = config.server.rounds

    try {
        const hashedPassword = await bcrypt.hash(user.password, ROUNDS)
        const saved = new UserDaos({
            ...user, 
            password: hashedPassword
        })
        const saveUser = await saved.save()
        return saveUser

    }catch(err: any) {
        throw new Error("Unable to create user at this time")
    }
}