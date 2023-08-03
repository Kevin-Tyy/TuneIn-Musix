import passport from "passport";
import GoogleStategy from "passport-google-oauth20";

passport.use(
	new GoogleStategy({
        clientID : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL : '/auth/google/redirect'
    }),
	() => {
		//passport callback function
	}
);
