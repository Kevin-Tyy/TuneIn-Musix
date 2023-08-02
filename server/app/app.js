import express from "express";
import { config } from 'dotenv'
import router from "../routes/index.js";

config()
const app = express();


app.use(express.json())
app.use('/api/v1', router)


export default app;
