'use client'
import { Message } from "@/actions/getAllMessages"
import { User } from "@/actions/getCurrentUser"
import {format} from 'date-fns'
import {BsCheck2} from 'react-icons/bs'
import {BsCheck2All} from 'react-icons/bs'
import Scroller from './Scroller'
import { useSocket } from "@/providers/MyProvider"
import { useEffect, useState } from "react"
import Image from "next/image"


type Props = {allMessages:Message[],
    user:User,
    currentUser:User}

const MessagesContainer = ({allMessages,user,currentUser}: Props) => {
    const {state,dispatch} = useSocket()




useEffect(()=>{
    dispatch({type:"MESSAGES",payload:allMessages})
},[allMessages])

useEffect(()=>{

    if(state.newSocket ){
state.newSocket.on('msg-recieve',(data)=>{
  dispatch({type:'NEW_MESSAGE',payload:{id:Date.now(),message:data.message,createdAt:Date.now(),type:data.type}})
  console.log(state.messages)




})

     
    }
  },[state.newSocket])


if(allMessages.length===0 && state.messages.length===0)return <div className="h-full flex items-center justify-center">No messages</div>

   else if(state.messages.length===0) return <div className="h-full flex items-center justify-center">Please wait...</div>
  
  return (
<div className=' flex-1 relative overflow-y-auto myScroll p-4'>
{state.messages.map(message=><div key={message.id} className={`flex w-full ${currentUser?.id === message.senderId ? ' justify-end': 'justify-start'} mb-2 `}>
 {/* text */}
  {message.type==='text' && <div className={`${currentUser?.id === message.senderId ? ' bg-green-700/40': 'bg-zinc-700/40'} text-white max-w-[45%] p-2 rounded-lg flex items-end gap-2`}>
    <p className='overflow-hidden'>{message.message}</p>
    <span className='text-zinc-200 text-[10px] flex-shrink-0'>{format(new Date(message.createdAt),"hh:mm a")}</span>
    {message.senderId === currentUser?.id &&<span>
      
      {message.messageStatus === 'sent' && <BsCheck2 color='white' size={15} />}
      {message.messageStatus === 'delivered' && <BsCheck2All color='white' size={15} />}
      {message.messageStatus === 'read' && <BsCheck2All className='text-blue-400' size={15} />}
      </span>}
    
    
    </div>}
{/* image */}
    {
      message.type==='image' && <div className={`${currentUser?.id === message.senderId ? ' bg-green-700/40': 'bg-zinc-700/40'} p-2 rounded-lg`}>
<Image src={`http://localhost:8800/${message.message}`} width={300} height={300} alt="img" />
<div className="flex items-center gap-2 justify-end mt-2"><span className='text-zinc-200 text-[10px] flex-shrink-0'>{format(new Date(message.createdAt),"hh:mm a")}</span>
{message.senderId === currentUser?.id &&<span>
      
      {message.messageStatus === 'sent' && <BsCheck2 color='white' size={15} />}
      {message.messageStatus === 'delivered' && <BsCheck2All color='white' size={15} />}
      {message.messageStatus === 'read' && <BsCheck2All className='text-blue-400' size={15} />}
      </span>}
</div>


        
      </div>
    }

</div>)}
<Scroller allMessages={allMessages} />
</div>
  )
}

export default MessagesContainer