import type {Request, Response, NextFunction} from 'express'

export const isAuthenticated = (req: Request, res: Response, next: NextFunction)=>{
    // isAuthenticated() return true -> if the user is logged (passport).
    if(req.isAuthenticated()){
        return next()
    }
    res.status(401).json({message: 'Unauthorized: please login'})
}