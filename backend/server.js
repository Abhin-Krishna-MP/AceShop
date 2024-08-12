import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import productRouter from './routes/productRoute.js'

//app config
const app = express()
const port = 4000


//middleware
app.use(express.json())
app.use(cors())

//DB connection
connectDB()

//Api end-points

app.use('/api/product',productRouter)

app.get("/",(req,res)=>{
    res.send("Api working")
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})