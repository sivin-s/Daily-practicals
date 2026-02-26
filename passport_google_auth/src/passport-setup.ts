import passport from 'passport';
import { Strategy as GoogleStrategy, type Profile } from 'passport-google-oauth20'

// Debug: confirm what values are actually loaded from .env
console.log('--- Passport Setup ---');
console.log('GOOGLE_CLIENT_ID    :', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? `${process.env.GOOGLE_CLIENT_SECRET.slice(0, 10)}...` : '❌ EMPTY');
console.log('GOOGLE_CALLBACK_URL :', process.env.GOOGLE_CALLBACK_URL);
console.log('----------------------');

// verify callback function 
passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL: process.env.GOOGLE_CALLBACK_URL || '',
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => {
        try {
            // log 
            console.log('✅ Verify callback reached!');
            console.log('profile > ', profile.displayName);
            console.log('accessToken > ', accessToken.slice(0, 20) + '...');

            // call the done fn with the user profile
            return done(null, profile)
        } catch (err) {
            // handle any errors that occur
            console.error('❌ Error in GoogleStrategy > ', err);
            return done(err);
        }
    }
))

// serialize user into session ->  'write the user to session' -> state
passport.serializeUser((user, done) => {
    done(null, user)
})

// deserialize user from session -> 'read the user from session'
passport.deserializeUser((user, done) => {
    done(null, user as Express.User)
})


export default passport;