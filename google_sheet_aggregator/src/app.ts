import 'dotenv/config';
import authRoutes from './routes/authRoutes.js';
import session from 'express-session';
import passport from './passport.js';
import express, { type NextFunction, type Request, type Response } from 'express';
import sheetRouter from './routes/sheetRoutes.js';

import './db/connect.js'

// nocache
import {nocache} from './middleware/nocache.js'

const app = express();

app.use(nocache())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(
    session(
        {
            secret: process.env.SESSION_SECRET || "default secret",
            resave: false,
            saveUninitialized: false,
            cookie:{
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 // 24 hours 
            }
        }
    )
)

app.use(passport.initialize())
app.use(passport.session()) //  restore

app.use('/api',authRoutes)
app.use('/api/sheet',sheetRouter)

// log
app.use((req:Request,res:Response,next:NextFunction)=>{
     console.log("user Data >", req.user)
    next()
})

app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
    console.log("Error >> ", err.message)
    res.status(500).json({
        status: "error",
        message: err.message
    })
})

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server started on port : "+process.env.PORT)
})

