import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";
import { GET_USER } from "@/libs/allRoutes";

export type User = {
    id:number,
    name:string,
    email:string,
    profileImg?:string,
    createdAt:Date,
    updatedAt:Date
} | null

export async function getSession(){
    try {
        const session = await getServerSession(authOptions)
        console.log(session)

        if(!session?.user?.email) return null
const res = await fetch(GET_USER,{
    method:"POST",
    headers:{"content-type":"application/json"},
    body:JSON.stringify({email:session.user.email})
})

const currentUser = await res.json()
const {password,...rest} = currentUser

if(!currentUser) return null

return rest as User
       
    } catch (error) {
        console.log(error)
        return null
        
    }
}