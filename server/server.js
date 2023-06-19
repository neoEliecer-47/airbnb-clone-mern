import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config.js'
import './database/connectMongoDB.js'

import path from 'path'
import { fileURLToPath } from 'url'

import authRoutes from './routes/authRoutes.js'
import photoRoutes from './routes/photoRoutes.js'
import placeRoutes from './routes/placeRoutes.js'
import bookRoutes from './routes/bookRoutes.js'



const app = express()

//middleware

//const ORIGIN_CORS = 
app.use(cors({
    credentials: true,
    origin: "https://airbnb-mern.netlify.app"
    
}));
//console.log(__dirname + "hola")
app.use(express.json())// nGwNsQaEW6KE4CRI limit: '50mb'
app.use(cookieParser())


const __dirname = path.dirname(fileURLToPath(import.meta.url));
//const __dirname = ruta.split("controllers")
//const __dir = __dirname.slice(0, -12)
//console.log(__dir)

app.use("/uploads", express.static(__dirname +'/uploads'))


app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/photos", photoRoutes)
app.use("/api/v1/places", placeRoutes)
app.use("/api/v1/booking", bookRoutes)

app.get("/", (req, res) => {
    res.json('hola desde el server node js')
    //console.log('hola desde node js')
})

app.listen(8000, () => console.log('server trabajando en puerto: http://localhost:8000'))