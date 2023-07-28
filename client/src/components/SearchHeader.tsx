'use client'
import { useSocket } from '@/providers/MyProvider'
import React from 'react'
import {VscChromeClose} from 'react-icons/vsc'

type Props = {}

const SearchHeader = (props: Props) => {

    const {dispatch} = useSocket()
  return (
    <div className='bg-primary flex items-center h-[70px] p-3 text-white gap-9'> 
    <span onClick={()=>dispatch({type:'OFF'})} className='cursor-pointer'><VscChromeClose color='white'/></span>
    <span className='text-white text-sm'>Search Messages</span>
    </div>
  )
}

export default SearchHeader