import createError from "../util/createError.js";
import { prismadb } from "../util/prismadb.js";


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
    const messages =await prisma.messages.findMany({
        where:{
            OR:[
                {senderId:+from,recieverId:+to},{senderId:+to,recieverId:+from}
            ]
        },
        orderBy:{
            createdAt:'asc'
        }
    })
console.log(messages)
    res.status(201).json(messages) 
} catch (error) {
    console.log(error)
    next(error)
}


}