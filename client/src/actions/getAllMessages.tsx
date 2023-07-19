import { ALL_MESSAGES } from '@/libs/allRoutes'
import axios from 'axios'
import { User } from './getCurrentUser'

export type Message={
    id :string
    sender?:User
    senderId :number
    reciever?: User 
    recieverId :number
    type:string
    message :string
    messageStatus :string
    createdAt:Date
    updateAt :Date
}

export async function getAllMessages(from:number | undefined,to:number | undefined){

try {
    const messages =await axios.post(ALL_MESSAGES,{from,to})
    return messages.data as Message[]
} catch (error) {
    return []
}

}