import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import GitHubStrategy from "passport-github2";
import AuthService from "../services/authService.js";
import UserModel from "../models/usersModel.js";
export const passportAuth = () => {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: `${process.env.CALLBACK_URL}/google/callback`,
			},
			(accessToken, refreshToken, profile, callback) => {
				console.log("passport google callback fired");
				AuthService.createUser(profile)
					.then((newUser) => {
						console.log(newUser);
					})
					.catch((error) => {
						console.log(`Error ${error}`);
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
			(accessToken, refreshToken, profile, callback) => {
				console.log("passport github callback fired");
				console.log(profile);
				AuthService.createUser(profile)
					.then((newUser) => {
						console.log(newUser);
					})
					.catch((error) => {
						console.log(`Error ${error}`);
					});
			}
		)
	);
};
