import Joi, { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/User" 

export function ValidateSchema(schema: ObjectSchema) {
    return async(req: Request, res:Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next()
        }catch(err) {
            return res.status(422).json({ message: "Object validation failed, please include a valid object" })
        }
    }
}

export const Schemas = {
    user: {
        create: Joi.object<IUser>({
            type: Joi.string().valid("ADMIN", "EMPLOYEE", "PATRON").required(),
            firstname: Joi.string().required(),
            lastname: Joi.string().required(),
            email: Joi.string().regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).required(),
            password: Joi.string().required(),
        })
    }
}