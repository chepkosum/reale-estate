import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to MongoDb')
}).catch((err)=>{
    console.log(err);
})

const app = express();

app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})


app.use(express.json())

app.use("/api/user", userRouter )
app.use('/api/auth', authRouter)



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