import bcrypt from "bcrypt"
import { config } from "../config"
import User, {IUserModel} from "../daos/UserDao" 
import { IUser } from "../models/User"
import { UnableToSaveUserError } from "../utils/LibraryErrors"

export async function register(user: IUser): Promise<IUserModel> {
    const ROUNDS = config.server.rounds

    try {
        const salt = await bcrypt.genSalt(ROUNDS)
        const hashedPassword = await bcrypt.hash(user.password, salt)
        const saved = new User({
            ...user, 
            password: hashedPassword
        })
        const saveUser = await saved.save()
        return saveUser

    }catch(err: any) {
        throw new UnableToSaveUserError(err.message)
    }
}