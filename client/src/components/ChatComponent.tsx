'use client'
import { User } from '@/actions/getCurrentUser'
import { useCallback, useState } from 'react'
import {BsEmojiSmile} from 'react-icons/bs'
import {ImAttachment} from 'react-icons/im'
import {IoMdSend} from 'react-icons/io'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ADD_MESSAGE } from '@/libs/allRoutes'
import { useRouter } from 'next/navigation'

type Props = {
  user:User | null
  currentUser: User | null
}

const ChatComponent = ({user,currentUser}: Props) => {

  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
const router = useRouter()
const handleSubmit = useCallback(async(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
if(!message.trim() || isLoading) return 
setIsLoading(true)
try {
  await axios.post(ADD_MESSAGE,{from:currentUser?.id,to:user?.id,message})
setMessage('')
  toast.success('Message is sent')
  router.refresh()
} catch (error) {
  console.log(error)
toast.error('Something went wrong')

} finally{
  setIsLoading(false)
}

},[message,isLoading])


  return (
    <form onSubmit={handleSubmit} className='p-4 bg-primary flex items-center gap-4'>
<div
className='flex items-center gap-4'>
    <span className='text-white cursor-pointer'><BsEmojiSmile size={18} /></span>
    <span className='text-white cursor-pointer'><ImAttachment size={18} /></span>
</div>
<input value={message} onChange={e=>setMessage(e.target.value)} type='text' className='p-1 outline-none flex-1 rounded-lg bg-[#28363f]  px-3 text-white' placeholder='Type a message'  />
<div>
<button disabled={!message.trim() || isLoading} type='submit'  className='text-white  flex items-center justify-center disabled:opacity-40'><IoMdSend size={18} /></button>
</div>
    </form>
  )
}

export default ChatComponent