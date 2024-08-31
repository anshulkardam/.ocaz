import express from "express"
import Mainrouter from "./routes/index.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
const app = express()

const origins = ['https://ocaz.vercel.app', 'http://localhost:5173' ]
const corsOptions = {
    origin: origins,  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
};

app.use(cors(corsOptions));

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1", Mainrouter);

app.listen(3000, () => { console.log("Server Started!") })