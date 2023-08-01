import { START_UP } from "@/libs/allRoutes";

import { User } from "./getCurrentUser";
import { Message } from "./getAllMessages";


export type StartUp = {
    users:{
        createdAt:Date,
        email:string,
        id:number,
        message:string,
        messageId:number,
        messageStatus:string,
        name:string,
        password:string,
        profileImg:string,
        recieverId:number,
        senderId:number,
        totalUnreadMessages:number,
        type:string,
        updatedAt:Date


    }[] | null,
    onlineUsers:User[]
} | null

export async function startUp (userId:any){


    try {
        const res = await fetch(START_UP+userId)
const data = await res.json()

return data as StartUp

    } catch (error) {
        console.log(error)
        return null
    }


}