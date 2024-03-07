import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import listingRouter from './routes/listing.route.js'
import cookieParser from 'cookie-parser'
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to MongoDb')
}).catch((err)=>{
    console.log(err);
})

const app = express();

app.use(express.json())

app.use(cookieParser());


app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})




app.use("/api/user", userRouter )
app.use('/api/auth', authRouter)
app.use('/api/listing', listingRouter)



//Error middleware
app.use((err, req, res, next)=>{
    const statuscode = err.statuscode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statuscode).json({
        success: false,
        statuscode,
        message
    })
})