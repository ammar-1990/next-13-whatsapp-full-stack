import express from 'express'
import { registerController,loginController,getUser, getAllUsers } from '../controllers/authController.js'

const route = express.Router()


route.post('/register',registerController)
route.post('/login',loginController)
route.post('/getuser',getUser)
route.get('/all',getAllUsers)


export default route           