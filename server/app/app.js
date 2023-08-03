import express from "express";
import { config } from "dotenv";
import cors from "cors";
import router from "../routes/index.js";
import passport from "passport";
import { passportAuth } from "../config/passport.js";
import cookieSession from "cookie-session";
config();
const { json, urlencoded } = express;
const app = express();

//json data in request body
app.use(urlencoded({ extended: true, limit: "30mb" }));
app.use(json({ limit: "30mb" }));
app.use(cookieSession({ name: "session", keys: ["kevin"] }));
//cors for cross origin requests
app.use(cors());

passportAuth()

app.use(passport.initialize());
app.use(passport.session());

//api endpoint route handlers
app.use("/api/v1", router);

export default app;
