import express from 'express'
import {addImage,  addMessage, getMessages } from '../controllers/messagesController.js'
import multer from 'multer'

const router = express.Router()



const uploadImage = multer({
    dest:'uploads/images'
})

router.post('/add-message',addMessage)
router.post('/all-messages',getMessages) 
router.post('/add-image',uploadImage.single('image'),addImage)  

export default router