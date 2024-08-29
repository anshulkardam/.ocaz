import express from "express"
import Mainrouter from "./routes/index.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
const app = express()

const corsOptions = {
    origin: 'https://ocaz.vercel.app',  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
};

app.use(cors(corsOptions));

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1", Mainrouter);

app.listen(3000, () => { console.log("Server Started!") })