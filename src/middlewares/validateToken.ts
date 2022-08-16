import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken"

async function validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    const token = authorization?.replace("Bearer ", "").trim()
    
    if (!token) {
        throw { type: "not_found", message: "invalid token" }
    }

    const key = process.env.JWT_SECRET_KEY;
    const user = jwt.verify(token, key)
    
    if (!user) {
        throw { type: "not_found", message: "User not found" };
    }

    res.locals.user = user
    
    next()
}

export default validateToken