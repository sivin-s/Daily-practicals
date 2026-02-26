import express,{type NextFunction, type Request ,type Response} from 'express';
import passport from '../passport.js'

const authRoutes=  express.Router()


authRoutes.get('/',(req:Request,res:Response)=>{
    res.send('<h1>Hello.....</h1><br><a href="/api/auth/google">Login with Google</a>')
})

// auth start
authRoutes.get('/auth/google',
    passport.authenticate("google",{
        scope:["email","profile",
            "https://www.googleapis.com/auth/spreadsheets.readonly"
        ],
        accessType:"offline",  // required for refresh token -> cron-job task or background checking task
        prompt:"consent"
    })
)

// callback from google
authRoutes.get('/auth/google/callback',
    passport.authenticate("google",{
        failureRedirect: '/',
        failureMessage: true
    }),
    (req:Request,res:Response)=>{
        res.redirect('/api/profile')
    },
)

// profile
authRoutes.get('/profile',(req:Request,res:Response)=>{
    if(!req.user){
        return res.redirect('/')
    }
    
    const user = req.user as Express.User;
    res.send(`
        <h1>Profile</h1>
        <p>Welcome ${user.displayName}</p>
        <img  src='${user.photos?.[0]?.value}' alt="profile img"/>
        <br/>
        <a href="/api/logout">Logout</a>
        `)
})

authRoutes.get("/logout",(req:Request,res:Response,next:NextFunction)=>{
   req.logOut((err)=>{
     if(err) return next(err)
     res.redirect('/api')
   })
})

export default authRoutes;