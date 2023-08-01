'use client'


import { useSocket } from '@/providers/MyProvider'
import React, { useEffect, useState } from 'react'
import SearchHeader from './SearchHeader'
import { SlMagnifier } from 'react-icons/sl'
import { User } from '@/actions/getCurrentUser'
import {  formatDistanceToNow } from 'date-fns'
import Avatar from '@/app/(auth)/signin/Avatar'

type Props = {
    user:User,
    currentUser:User
  
}

const SearchingComponent = ({user,currentUser}: Props) => {
    const {state,dispatch} = useSocket()

    if(!state.isSearching) return

    const [search, setSearch] = useState('')



  return (
    <div className='fixed top-0 right-0 h-full w-[400px] bg-secondary z-50 flex flex-col'>
       {/* header */}
<SearchHeader />

{/* body */}
<div className='flex-1 px-3 flex flex-col gap-8 pb-3  overflow-y-auto myScroll'>


    {/* search */}
<div className="flex items-center  p-1 px-3 gap-3 bg-primary rounded-lg mt-5">
        <span className="">
          <SlMagnifier size={15} color={"white"} />
        </span>

        <input
          placeholder="Search"
          value={search}
          onChange={e=>setSearch(e.target.value)}
          type="text"
          className="flex-1 p-1 text-xs bg-primary outline-none text-white w-12"
        />
      </div>

      {/* result */}

     {!search&& <div className='text-xs text-gray-300 text-center'>
        Search for messages with {user?.name}

       
      </div>}
      <div className='flex flex-col flex-1'>
        {search && state.messages.filter((el)=>el.type==="text"&&el.message.includes(search)).length === 0 && <p className='text-xs text-gray-300 text-center'>No such messages</p>}
        {search && state.messages.filter(el=>el.type==='text' &&el.message.includes(search)).reverse().map((message)=>
        
        <div key={message.id} className=' p-3 flex flex-col hover:bg-primary'>
            <div className='flex items-center justify-between'>
            <span className='text-zinc-400 text-[10px] flex-shrink-0'>{formatDistanceToNow(new Date(message.createdAt))}</span>
            <p className='mt-1 capitalize text-[8px] text-zinc-400'>By {message.sender?.id === currentUser?.id? 'you' : message.sender?.name}</p>
            </div>
       
        <p className='text-sm text-green-400'>{message.message}</p>
 
        </div>)}

      </div>
</div>


    </div>
  )
}

export default SearchingComponent