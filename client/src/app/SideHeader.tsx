'use client'
import React, { Dispatch, SetStateAction } from 'react'
import Avatar from './(auth)/signin/Avatar'
import { User } from '@/actions/getCurrentUser'
import {MdOutlineMessage} from 'react-icons/md'
import {SlOptionsVertical} from 'react-icons/sl'

type Props = {
    currentUser:User,
    setMessages:Dispatch<SetStateAction<boolean>>
}

const SideHeader = ({currentUser,setMessages}: Props) => {
  return (
    <div className="flex items-center justify-between p-3">
    <Avatar sm image={currentUser?.profileImg as string} />
    <div className='flex items-center gap-6'>
        <span onClick={()=>setMessages(true)} className='cursor-pointer'><MdOutlineMessage color='white' size={20} /></span>
<span className='cursor-pointer'><SlOptionsVertical color='white' size={20} /></span>

    </div>
</div>
  )
}

export default SideHeader 