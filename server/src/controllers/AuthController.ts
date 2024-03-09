import { Request, Response } from "express";
import { register } from "../services/UserService";
import { IUser } from "../models/User";

async function handleRegister(req: Request, res: Response) {
    const user: IUser = req.body

    try {
        const registeredUser = await register(user)
        res.status(201).json({
            message: "User successfully registered",
            user: {
                _id: registeredUser._id,
                type: registeredUser.type,
                firstNname: registeredUser.firstName,
                lastName: registeredUser.lastName,
                email: registeredUser.email
            } 
        })
    }catch(err: any) {
        res.status(500).json({
            message: "Unable to register at this time",
            err: err.message
        })
    }
} 

export default { handleRegister }