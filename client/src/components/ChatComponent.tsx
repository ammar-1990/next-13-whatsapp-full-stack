'use client'
import {BsEmojiSmile} from 'react-icons/bs'
import {ImAttachment} from 'react-icons/im'
import {IoMdSend} from 'react-icons/io'

type Props = {}

const ChatComponent = (props: Props) => {
  return (
    <form className='p-4 bg-primary flex items-center gap-4'>
<div
className='flex items-center gap-4'>
    <span className='text-white cursor-pointer'><BsEmojiSmile size={18} /></span>
    <span className='text-white cursor-pointer'><ImAttachment size={18} /></span>
</div>
<input type='text' className='p-1 outline-none flex-1 rounded-lg bg-[#28363f]  px-3 text-white' placeholder='Type a message'  />
<div>
<span className='text-white cursor-pointer'><IoMdSend size={18} /></span>
</div>
    </form>
  )
}

export default ChatComponent