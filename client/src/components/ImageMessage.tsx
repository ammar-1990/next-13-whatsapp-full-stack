import { Message } from '@/actions/getAllMessages'
import { User } from '@/actions/getCurrentUser'
import { THE_SERVER } from '@/libs/allRoutes'
import Image from 'next/image'
import {formatDistanceToNow} from 'date-fns'
import {BsCheck2} from 'react-icons/bs'
import {BsCheck2All} from 'react-icons/bs'

type Props = {
    message:Message,
    currentUser:User
}

const ImageMessage = ({currentUser,message}: Props) => {
  console.log("https://whatsapp-socket-5sos.onrender.com/",message.message)
  return (
    <div className={`${currentUser?.id === message.senderId ? ' bg-green-700/40': 'bg-zinc-700/40'} p-2 rounded-lg`}>
    <Image src={`https://whatsapp-socket-5sos.onrender.com/${message.message}`} width={300} height={300} alt="img" className="object-cover"/>
    <p className='text-white text-lg'>{`https://whatsapp-socket-5sos.onrender.com/${message.message}`}</p>
    <div className="flex items-center gap-2 justify-end mt-2"><span className='text-zinc-200 text-[10px] flex-shrink-0'>{formatDistanceToNow(new Date(message.createdAt))}</span>
    {message.senderId === currentUser?.id &&<span>
          
          {message.messageStatus === 'sent' && <BsCheck2 color='white' size={15} />}
          {message.messageStatus === 'delivered' && <BsCheck2All color='white' size={15} />}
          {message.messageStatus === 'read' && <BsCheck2All className='text-blue-400' size={15} />}
          </span>}
    </div>
    
    
            
          </div>
  )
}

export default ImageMessage