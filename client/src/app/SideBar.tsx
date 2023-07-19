'use client'

import { User } from "@/actions/getCurrentUser"
import Avatar from "./(auth)/signin/Avatar"
import SideHeader from "./SideHeader"
import SearchComponent from "./SearchComponent"
import List from "./List"
import { useEffect, useState } from "react"
import ContactsHeader from "./ContactsHeader"
import ContactsBody from "./ContactsBody"
import { AllUsers } from "@/actions/getAllUsers"
import { io } from "socket.io-client"
import { useSocket } from "@/providers/MyProvider"
import { useRouter } from "next/navigation"


type Props = {
    currentUser: User ,
    allUsers:AllUsers
}

const SideBar = ({currentUser,allUsers}: Props) => {
const {dispatch,state}= useSocket()
const [once, setOnce] = useState(false)
  useEffect(()=>{

    const newSocket = io("http://localhost:8800")
    newSocket.emit('add-user',(currentUser?.id))
    dispatch({type:'NEW_SOCKET',payload:newSocket})


  },[currentUser,dispatch])
const router = useRouter()





  const [messages, setMessages] = useState(false)
  return (
    <div className=" col-span-1 flex flex-col bg-primary">
      {
        !messages ? ( <div className="  flex flex-col h-screen">
        <SideHeader currentUser={currentUser} setMessages={setMessages} />
        <div className="flex-1 bg-secondary flex flex-col">
        <SearchComponent />
        <List allUsers={allUsers}/>
        
        </div>
        </div>):(
          <div className="flex flex-col h-screen">
<ContactsHeader setMessages={setMessages} />
<ContactsBody allUsers={allUsers} currentUser={currentUser}/>
          </div>
        )
      }
     

      

    </div>
  )
}

export default SideBar