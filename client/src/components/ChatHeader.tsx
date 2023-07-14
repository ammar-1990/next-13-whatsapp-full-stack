'use client'
import { SlMagnifier } from "react-icons/sl";
import { SlOptionsVertical } from "react-icons/sl";
import { IoIosCall } from "react-icons/io";
import { BsFillCameraVideoFill } from "react-icons/bs";
import Avatar from '@/app/(auth)/signin/Avatar'
import React from 'react'

type Props = {}

const ChatHeader = (props: Props) => {
  return (
    <div className='p-3 flex items-center justify-between '>

        <div className='flex items-center gap-5'>
            <Avatar  sm />
            <div className='flex flex-col text-xs text-white'>
<span className='font-semibold'>DEMO</span>
<span>online/offline</span>
            </div>
        </div>


        <div className="flex items-center gap-7">
            <span className="text-white  cursor-pointer"><IoIosCall  size={20}/></span>
            <span className="text-white  cursor-pointer"><BsFillCameraVideoFill  size={20}/></span>
            <span className="text-white  cursor-pointer"><SlMagnifier size={20} /></span>
            <span className="text-white  cursor-pointer"><SlOptionsVertical  size={20}/></span>

        </div>
    </div>
  )
}

export default ChatHeader