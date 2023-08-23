import express from 'express'
import { registerController,loginController,getUser, getAllUsers, getToken } from '../controllers/authController.js'

const route = express.Router()


route.post('/register',registerController)
route.post('/login',loginController)
route.post('/getuser',getUser)
route.get('/all',getAllUsers)
route.get('/generate-token/:userId',getToken)


export default route                 