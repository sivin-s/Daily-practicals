import passport from 'passport';
import { Strategy as GoogleStrategy, type Profile } from 'passport-google-oauth20'
import User from './models/User.js';


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || ''
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => {
      try {
        console.log("✅ verify callback reached ...")
        console.log("profile > ", profile.displayName)

        // Find or create the user in MongoDB
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            googleId: profile.id, // google id unique from google for user (identifier)
            displayName: profile.displayName,
            accessToken,
            refreshToken,
          });
        } else {
          // Keep tokens fresh on every login
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          await user.save(); // promise boolean
        }
        // Notice:: done() =>  done user argument passport append to req object.  
        // that why we get user from req body(req.user)
        done(null, user); // req.user = MongoDB user doc (has _id)
      } catch (err) {
        return done(err, null)
      }
    }
  )
)


passport.serializeUser((user, done) => {  // session write (state)
  // done(null, user)
  done(null, user._id)
})

passport.deserializeUser((user, done) => { // session read (state)
  // eg :findOne ...
  // done(null, user as Express.User)
  User.findById(user)
  .then((userDetails)=> done(null, userDetails as Express.User))
  .catch((err)=> done(err, null))
})

export default passport