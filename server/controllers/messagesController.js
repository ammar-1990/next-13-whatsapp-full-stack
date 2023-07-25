import createError from "../util/createError.js";
import { prismadb } from "../util/prismadb.js";
import {renameSync} from 'fs'


export async function addMessage (req,res,next){

const {message,from,to} = req.body

if(!message || !from || !to) return next(createError('something went wrong',400))

const getUser = onlineUsers.get(to)

const prisma =  prismadb()

try {
    const newMessage = await prisma.messages.create({      
        data:{
            senderId : +from,
            recieverId : +to,
          
            message,
            messageStatus: getUser ? 'delivered' : 'sent' 
        },
        include:{
            sender:true,
            reciever:true
        }
    })
    res.status(201).json(newMessage)  
} catch (error) {
    next(error)
    console.log(error)  
    
}




}



export async function getMessages (req, res, next){ 
const prisma = prismadb()
const {from,to} = req.body
if(!from || !to) return next(createError('someting went wrong'),400)

try {


await prisma.messages.updateMany({
    where:{
        senderId:+from,
        recieverId:+to
    },
    data:{
        messageStatus:'read'
    }
}) 

    const messages =await prisma.messages.findMany({
        where:{
            OR:[
                {senderId:+from,recieverId:+to},{senderId:+to,recieverId:+from} 
            ]
        }, 
        orderBy:{
            createdAt:'asc'
        },
        include:{sender:true,
        reciever:true}
    })
// console.log(messages)

// let unreadMessages=[]
// messages.forEach(message=>{
//     if(message.messageStatus !=='read' && message.senderId === +to){ 
//         message.messageStatus ==='read'
//         unreadMessages.push(message.id)
//     }   
// })
 
// await prisma.messages.updateMany({
//     where:{
//         id:{in:unreadMessages}
//     },
//     data:{
//         messageStatus:'read'
//     }
// })
    res.status(201).json(messages) 
} catch (error) {
    console.log(error)
    next(error)
}


}

export async function addImage(req,res,next){   
    try {
      
        if(req.file){
          
            const date = Date.now()
            const fileName= 'uploads/images/'+date+req.file.originalname
renameSync(req.file.path, fileName)
const prisma = prismadb()

const {from, to} = req.query 
const message = await prisma.messages.create({   
    data:{
        message:fileName,
        senderId:+from, 
        recieverId:+to,
       type:'image'
    }
})

return res.status(200).json(message)

        }
        res.status(400).send('no file')
    } catch (error) {
        next(error)
        console.log(error)
    }
}






export async function addAudio(req,res,next){   
    try {
      
        if(req.file){
          
            const date = Date.now()
            const fileName= 'uploads/recordings/'+date+req.file.originalname
renameSync(req.file.path, fileName)
const prisma = prismadb()

const {from, to} = req.query 
const message = await prisma.messages.create({   
    data:{
        message:fileName,
        senderId:+from, 
        recieverId:+to,
       type:'audio'
    }
})

return res.status(200).json(message)

        }
        res.status(400).send('no file')
    } catch (error) {
        next(error)
        console.log(error)
    }
}