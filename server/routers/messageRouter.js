import express from 'express'
import { addMessage, getMessages } from '../controllers/messagesController.js'

const router = express.Router()

router.post('/add-message',addMessage)
router.post('/all-messages',getMessages) 

export default router