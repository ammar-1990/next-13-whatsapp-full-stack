'use client'
import { Dispatch, SetStateAction } from 'react'
import {AiOutlineArrowLeft} from 'react-icons/ai'

type Props = {
setMessages:Dispatch<SetStateAction<boolean>>
}

const ContactsHeader = ({setMessages}: Props) => {
  return (
    <div
    className='p-4 h-[64px]  flex items-center gap-8'
    >
<AiOutlineArrowLeft onClick={()=>setMessages(false)} size={20} color='white' className='cursor-pointer' />
<p className='text-white capitalize'>new chat</p>
    </div>
  )
}

export default ContactsHeader