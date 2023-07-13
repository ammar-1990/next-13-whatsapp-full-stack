'use client'
import React from 'react'
import Avatar from './(auth)/signin/Avatar'
import { User } from '@/actions/getCurrentUser'
import {MdOutlineMessage} from 'react-icons/md'
import {SlOptionsVertical} from 'react-icons/sl'

type Props = {
    currentUser:User
}

const SideHeader = ({currentUser}: Props) => {
  return (
    <div className="flex items-center justify-between p-3">
    <Avatar sm image={currentUser?.profileImg as string} />
    <div className='flex items-center gap-6'>
        <span className='cursor-pointer'><MdOutlineMessage color='white' size={20} /></span>
<span className='cursor-pointer'><SlOptionsVertical color='white' size={20} /></span>

    </div>
</div>
  )
}

export default SideHeader 