import axios from 'axios'
import { ALL_USERS } from '@/libs/allRoutes'
import { User } from './getCurrentUser'

export type AllUsers = {[key:string]:User[]} | User | null

export async function getAllUsers (id?:string){

    let allUsers

    if(id){
        allUsers = async()=>{
           return axios.get(ALL_USERS + `?id=${id}`)
        }
    }

    else {
        allUsers = async()=>{
         return   axios.get(ALL_USERS)
        }
    }

try {
 const myResult =    await allUsers ()
    return myResult.data as AllUsers
} catch (error) {
    console.log(error)
    return null
}

}