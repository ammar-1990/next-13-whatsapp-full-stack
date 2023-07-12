import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './routers/authRouter.js'

const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())

const server = app.listen(process.env.PORT,()=>console.log(`Server started on port ${process.env.PORT}`))



app.use('/api/auth',authRoute)







app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'something went wrong'
  
    return res.status(errorStatus).send(errorMessage)
})
