import bcrypt from "bcrypt"
import { config } from "../config"
import User, { IUserModel } from "../daos/UserDao"
import { IUser } from "../models/User"
import { UnableToSaveUserError, InvalidUsernameOrPassword } from "../utils/LibraryErrors"

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

    } catch (err: any) {
        throw new UnableToSaveUserError(err.message)
    }
}

export async function login(credentials: { email: string, password: string }): Promise<IUserModel> {
    const { email, password } = credentials
    try {
        const user = await User.findOne({ email })
        if (!user) {
            throw new InvalidUsernameOrPassword("invalid username and password")
        }else {
            const validPassword: boolean = await bcrypt.compare(password, user.password)

            if(validPassword) {
                return user
            }else {
                throw new InvalidUsernameOrPassword("invalid username and password")
            }
        }

    } catch (err: any) {
        throw err;
    }
}