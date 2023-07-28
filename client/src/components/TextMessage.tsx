import { Message } from '@/actions/getAllMessages'
import { User } from '@/actions/getCurrentUser'
import {formatDistanceToNow} from 'date-fns'
import {BsCheck2} from 'react-icons/bs'
import {BsCheck2All} from 'react-icons/bs'

type Props = {
    message:Message,
    currentUser:User
}

const TextMessage = ({message,currentUser}: Props) => {
  return (
<div className={`${currentUser?.id === message.senderId ? ' bg-green-700/40': 'bg-zinc-700/40'} text-white max-w-[45%] p-2 rounded-lg flex items-end gap-2`}>
    <p className='overflow-hidden'>{message.message}</p>
    <span className='text-zinc-200 text-[10px] flex-shrink-0'>{formatDistanceToNow(new Date(message.createdAt))}</span>
    {message.senderId === currentUser?.id &&<span>
      
      {message.messageStatus === 'sent' && <BsCheck2 color='white' size={15} />}
      {message.messageStatus === 'delivered' && <BsCheck2All color='white' size={15} />}
      {message.messageStatus === 'read' && <BsCheck2All className='text-blue-400' size={15} />}
      </span>}
    
    
    </div>
  )
}

export default TextMessage