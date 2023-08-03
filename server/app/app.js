import express from "express";
import { config } from 'dotenv'
import cors from 'cors'
import router from "../routes/index.js";
config()
const { json , urlencoded } = express
const app = express();

app.use(urlencoded({ extended : true , limit : '30mb'}))
app.use(json({ limit : '30mb' }))   
app.use(cors())

app.use('/api/v1', router)
export default app;
