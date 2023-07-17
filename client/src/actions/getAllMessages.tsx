import { ALL_MESSAGES } from '@/libs/allRoutes'
import axios from 'axios'



export async function getAllMessages(from:number | undefined,to:number | undefined){

try {
    const messages =await axios.post(ALL_MESSAGES,{from,to})
    return messages.data
} catch (error) {
    return []
}

}