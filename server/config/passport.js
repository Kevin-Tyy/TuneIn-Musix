import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import GitHubStrategy from "passport-github2";
import AuthService from "../services/authService.js";
import UserModel from "../models/usersModel.js";
export const passportAuth = () => {
	passport.serializeUser((user, done) => {
		done(null, user.email);
	});
	passport.deserializeUser((user, done) => {
		UserModel.findOne({ email: user.email }).then((user) => {
			done(null, user);
		});
	});

	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: `${process.env.CALLBACK_URL}/google/callback`,
			},
			(accessToken, refreshToken, profile, done) => {
				AuthService.findOrCreate(profile)
					.then((user) => {
						return done(null, user);
					})
					.catch((error) => {
						done(error);
					});
			}
		)
	);
	passport.use(
		new GitHubStrategy(
			{
				clientID: process.env.GITHUB_CLIENT_ID,
				clientSecret: process.env.GITHUB_CLIENT_SECRET,
				callbackURL: `${process.env.CALLBACK_URL}/github/callback`,
				scope: ["user:email"],
			},
			(accessToken, refreshToken, profile, done) => {
				AuthService.findOrCreate(profile)
					.then((user) => {
						return done(null, user);
					})
					.catch((error) => {
						done(error);
					});
			}
		)
	);
};
