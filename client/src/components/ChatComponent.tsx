'use client'
import { User } from '@/actions/getCurrentUser'
import { useCallback, useState, useEffect, useRef, ChangeEvent } from 'react'
import {BsEmojiSmile} from 'react-icons/bs'
import {ImAttachment} from 'react-icons/im'
import {IoMdSend} from 'react-icons/io'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ADD_IMAGE, ADD_MESSAGE } from '@/libs/allRoutes'
import { useRouter } from 'next/navigation'
import { useSocket } from '@/providers/MyProvider'
import EmojiPicker,{Theme} from 'emoji-picker-react'

type Props = {
  user:User | null
  currentUser: User | null
}

const ChatComponent = ({user,currentUser}: Props) => {
  const {state} = useSocket()

  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emoji, setEmoji] = useState(false)
const router = useRouter()
const handleSubmit = useCallback(async(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
if(!message.trim() || isLoading) return 
setIsLoading(true)
try {
await axios.post(ADD_MESSAGE,{from:currentUser?.id,to:user?.id,message})
setMessage('')
state.newSocket?.emit('send-msg',{to:user?.id,from:currentUser?.id,message,type:'text'})
  toast.success('Message is sent')

  router.refresh()
  
} catch (error) {
  console.log(error)
toast.error('Something went wrong')

} finally{
  setIsLoading(false)
}

},[message,isLoading])
const emoRef = useRef<HTMLSpanElement>(null)
useEffect(()=>{

  const clickHandler = (e:any)=>{

 
if(!emoRef.current?.contains(e.target)){
  setEmoji(false)
}
  }

  document.addEventListener('click',clickHandler)


  return () => {
    document.removeEventListener('click', clickHandler);
  };
},[])

const handleFile=useCallback(async(e:ChangeEvent<HTMLInputElement>)=>{ 
  const file = e.target.files?.[0]
 if(!file) return 
const formData = new FormData()
formData.append('image',file)
try {
  const {data} = await axios.post(ADD_IMAGE + `?from=${currentUser?.id}&to=${user?.id}`,formData,{headers:{'content-type': 'multipart/form-data' }})
  console.log(data.message)
  state.newSocket?.emit('send-msg',{to:user?.id,from:currentUser?.id,message:data.message,type:'image'})
  toast.success('Image is sent')
router.refresh()
} catch (error) {
  console.log(error) 
}

  

},[state.newSocket,axios,router,toast])

  return (
    <form onSubmit={handleSubmit} className='p-4 bg-primary flex items-center gap-4'>
<div
className='flex items-center gap-4'>
    <span ref={emoRef} className='text-white cursor-pointer relative' onClick={()=>setEmoji(true)}><BsEmojiSmile size={18} />
    {emoji && <span id='emoji' className='absolute bottom-12 left-12' ><EmojiPicker theme={'dark' as Theme} onEmojiClick={(e)=>setMessage(prev=>prev+e.emoji)} /></span>}
    </span>
    <label htmlFor='file' className='text-white cursor-pointer'><ImAttachment size={18} /></label><input id='file' onChange={handleFile} hidden type='file' />
</div>
<input value={message} onChange={e=>setMessage(e.target.value)} type='text' className='p-1 outline-none flex-1 rounded-lg bg-[#28363f]  px-3 text-white' placeholder='Type a message'  />
<div>
<button disabled={!message.trim() || isLoading} type='submit'  className='text-white  flex items-center justify-center disabled:opacity-40'><IoMdSend size={18} /></button>
</div>
    </form>
  )
}

export default ChatComponent