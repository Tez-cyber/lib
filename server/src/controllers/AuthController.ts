import { Request, Response } from "express";
import { login, register } from "../services/UserService";
import { IUser } from "../models/User";
import { IUserModel } from "../daos/UserDao";
import { InvalidUsernameOrPassword } from "../utils/LibraryErrors";

async function handleRegister(req: Request, res: Response) {
    const user: IUser = req.body

    try {
        const registeredUser = await register(user)
        res.status(201).json({
            message: "User successfully registered",
            user: {
                _id: registeredUser._id,
                type: registeredUser.type,
                firstname: registeredUser.firstname,
                lastname: registeredUser.lastname,
                email: registeredUser.email
            } 
        })
    }catch(err: any) {
        if(err.message.includes("E11000 duplicate key error collection:")){
            res.status(409).json({ message: "User with email already exists", err: err.message })
        } else {
            res.status(500).json({
                message: "Unable to register at this time",
                err: err.message
            })
        } 
    }
} 

async function handleLogin (req: Request, res: Response) {
    const credentials = req.body
    try {
        const loggedIn:IUserModel = await login(credentials)
        res.status(201).json({
            message: "User logged in successfully ",
            user: {
                _id: loggedIn._id,
                type: loggedIn.type,
                firstname: loggedIn.firstname,
                lastname: loggedIn.lastname,
                email: loggedIn.email
            } 
        })
    }catch(err: any) {
        if(err instanceof InvalidUsernameOrPassword) {
            res.status(401).json({
                message: "Unable to login user at this time",
                err: err.message
            })
        }else {
            res.status(500).json({
                message: "Unable to login user at this time",
                err: err.message
            })
        }
    }
}
export default { handleRegister, handleLogin }

