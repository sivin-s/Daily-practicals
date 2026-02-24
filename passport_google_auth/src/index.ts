import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import passport from './passport-setup.js';

const app = express();
const PORT = process.env.PORT || 3000;

// 1. session configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'default_secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 // 24 hours
        }
    })
)


// 2. passport middleware
app.use(passport.initialize())
app.use(passport.session()) // retrieving(restoring) the session data from the session store.

// Define the api router
const apiRouter = express.Router();

// 3. Routes
apiRouter.get('/', (req, res) => {
    res.send('<h1>Home</h1><a href="/api/auth/google">Login with Google</a>')
})

// Route to start Google OAuth
apiRouter.get('/auth/google',
    passport.authenticate('google', {
        scope: [
            'profile',
            'email'
        ]
    })
)

// callback route Google redirects to
apiRouter.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/api',
        failureMessage: true,   // logs exact Google error message
    }),
    (req, res) => {
        // successful authentication
        res.redirect('/api/profile')
    }
)

// Protected Route
apiRouter.get('/profile', (req, res) => {
    // Type guard to check  if user is logged in 
    if (!req.user) {
        return res.redirect('/api')
    }
    const user = req.user as Express.User;
    res.send(`
        <h1>Profile</h1>
        <p>Welcome, ${user.displayName}</p>
        <img src="${user.photos?.[0]?.value}" alt="profile photo"/>
        <br/>
        <a href="/logout">Logout</a>
        `)
})

apiRouter.get('/logout', (req, res, next) => {
    req.logOut((err) => {
        if (err) return next(err);
        res.redirect('/')
    })
})

// Router
app.use('/api', apiRouter)

// Error first Middleware -> next(err) -> first argument -> err
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    // console.error("Global Error Handler caught:", err.stack);
    console.error("Global Error Handler caught:", err.message);
    // respond to the client
    res.status(500).json({
        status: 'error',
        message: err.message
    })
})

// 4. start server
app.listen(PORT, () => {
    console.log("server running on http://localhost:" + PORT)
})