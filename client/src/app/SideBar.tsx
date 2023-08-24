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
import { THE_SERVER } from "@/libs/allRoutes"
import { StartUp } from "@/actions/getStartUp"


type Props = {
    currentUser: User ,
    allUsers:AllUsers,
    myStartUp:StartUp
}

const SideBar = ({currentUser,allUsers,myStartUp}: Props) => {
 
const {dispatch,state}= useSocket()
const [once, setOnce] = useState(false)
  useEffect(()=>{

    const newSocket = io(THE_SERVER)
    newSocket.emit('add-user',(currentUser?.id))
    dispatch({type:'NEW_SOCKET',payload:newSocket})


  },[currentUser,dispatch])


  useEffect(()=>{
    dispatch({type:'ONLINE',payload:myStartUp?.onlineUsers})
    dispatch({type:'USERS',payload:myStartUp?.users})

    console.log(state.onlineUsers,state.users)
    console.log('server',myStartUp)
  },[myStartUp,dispatch])



  useEffect(()=>{
if(state.newSocket){


  state.newSocket.on('incoming-voice-call',({from,roomId,callType})=>{
    dispatch({type:'inVoiceCall',payload:{...from,roomId,callType}})

  });

  state.newSocket.on('incoming-video-call',({from,roomId,callType})=>{
    dispatch({type:'inVideoCall',payload:{...from,roomId,callType}})

  });


  state.newSocket.on('voice-call-rejected',()=>{
    dispatch({type:'END_CALL'})

  });


  state.newSocket.on('video-call-rejected',()=>{

    dispatch({type:'END_CALL'})

  });

  state.newSocket.on('online-users',({onlineUsers})=>{
    dispatch({type:'ONLINE',payload:onlineUsers})

  })




}
console.log(state.inVideoCall)
console.log(state.inVoiceCall)
  },[state.newSocket])





const router = useRouter()





  const [messages, setMessages] = useState(false)
  return (
    <div className=" col-span-1 flex flex-col bg-primary">
      {
        !messages ? ( <div className="  flex flex-col h-screen">
        <SideHeader currentUser={currentUser} setMessages={setMessages} />
        <div className="flex-1 bg-secondary flex flex-col">
        <SearchComponent />
        <List myStartUp={myStartUp} currentUser={currentUser}/>
        
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