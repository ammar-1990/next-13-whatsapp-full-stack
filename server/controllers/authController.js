import createError from "../util/createError.js"
import {prismadb} from '../util/prismadb.js'
import bcryptjs from 'bcryptjs'


export async function registerController (req,res,next){

const body = req.body
const {email,name,password,profileImg} = body
console.log(body)
console.log(body.password)
if(!email || !name || !password) return next(createError('Enter all information please',400))

const prisma = prismadb()


try {
    const user = await prisma.user.findUnique({where:{
        email
    }})
    if(user) return next(createError('user already exist',400))
    
const hashedPassword = bcryptjs.hashSync(password,10)
console.log(hashedPassword)

    const newUser = await prisma.user.create({data:{
        email,name,password:hashedPassword,profileImg:profileImg || ''
    }})


    const {password:password_two,...rest} = newUser


res.status(201).json(rest)


} catch (error) {
    console.log(error)
    next(error)
}







}




export async function loginController(req,res,next){

    const {email,password} = req.body

    if(!email || !password) return next(createError('enter all information',400))
const prisma = prismadb()


try {
    const user = await prisma.user.findUnique({where:{email}})
    if(!user) return next(createError('Invalid credentials',400))

    const isCorrenct = bcryptjs.compareSync(password,user.password)
    if(!isCorrenct) return next(createError('Invalid credentials',400))
    const {password:password_two,...rest} = user

    res.status(200).json(rest)

} catch (error) {
    next(error)
}
   

}



export async function getUser  (req,res,next){ 

const {email} = req.body
const prisma = prismadb()

 
const user = await prisma.user.findUnique({where:{email}}) 
if(!user) return next(createError('no such user'),400)
res.status(200).json(user)

}


export async function getAllUsers (req,res,next) { 
    const prisma = prismadb()
const id = req.query.id

if(id){
try {
    const user = await prisma.user.findUnique({where:{id:+id}})
    if(!user) return res.status(200).json({})
    console.log(user)
    return res.status(200).json(user)
} catch (error) {
    next(error)
    console.log(error)
}
}


 

  

try {       
    const allUsers = await prisma.user.findMany({
        orderBy:{
            name:'asc'
        },
        select:{
            id:true,
            name:true, 
            email:true,
            profileImg:true
        }   
    })    

const usersByLetters = {}

allUsers.forEach((user)=>{
const letter = user.name.charAt(0).toUpperCase()
if(!usersByLetters[letter]){
    usersByLetters[letter]=[]
    usersByLetters[letter].push(user)
}

})

res.status(200).json(usersByLetters)

} catch (error) {
    console.log(error)

    next(error)     
}

}