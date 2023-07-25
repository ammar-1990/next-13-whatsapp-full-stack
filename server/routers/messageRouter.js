import express from 'express'
import {addAudio, addImage,  addMessage, getMessages } from '../controllers/messagesController.js'
import multer from 'multer'

const router = express.Router()



const uploadImage = multer({
    dest:'uploads/images'
})

const uploadAudio = multer({
    dest:'uploads/recordings'
})

router.post('/add-message',addMessage)
router.post('/all-messages',getMessages) 
router.post('/add-image',uploadImage.single('image'),addImage)  
router.post('/add-audio',uploadAudio.single('audio'),addAudio)   

export default router