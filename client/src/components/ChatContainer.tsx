import { getAllMessages } from '@/actions/getAllMessages'
import { User } from '@/actions/getCurrentUser'
import React from 'react'
import {format} from 'date-fns'
import {BsCheck2} from 'react-icons/bs'
import {BsCheck2All} from 'react-icons/bs'
import Scroller from './Scroller'

type Props = {
  user:User,
  currentUser:User
}

const ChatContainer =async ({user,currentUser}: Props) => {
  const allMessages = await getAllMessages(user?.id,currentUser?.id)
  console.log(allMessages)
  return (
    <div className='flex-1  overflow-y-auto  relative text-white flex flex-col '>
<div className='absolute bg-fixed inset-0 bg-chat-background opacity-5 z-[0]' /> 
<div className=' flex-1 relative overflow-y-auto myScroll p-4'>
{allMessages.map(message=><div key={message.id} className={`flex w-full ${currentUser?.id === message.senderId ? ' justify-end': 'justify-start'} mb-2 `}>
  {message.type==='text' && <div className={`${currentUser?.id === message.senderId ? ' bg-green-700/40': 'bg-zinc-700/40'} text-white max-w-[45%] p-2 rounded-lg flex items-end gap-2`}>
    <p className='overflow-hidden'>{message.message}</p>
    <span className='text-zinc-200 text-[10px] flex-shrink-0'>{format(new Date(message.createdAt),"hh:mm a")}</span>
    {message.senderId === currentUser?.id &&<span>
      
      {message.messageStatus === 'sent' && <BsCheck2 color='white' size={15} />}
      {message.messageStatus === 'delivered' && <BsCheck2All color='white' size={15} />}
      {message.messageStatus === 'read' && <BsCheck2All className='text-blue-400' size={15} />}
      </span>}
    
    
    </div>}

</div>)}
<Scroller allMessages={allMessages} />
</div>

    </div>
  )
}

export default ChatContainer