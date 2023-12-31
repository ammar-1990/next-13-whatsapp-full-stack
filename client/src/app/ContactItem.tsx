'use client'
import { User } from '@/actions/getCurrentUser'
import React, { useCallback } from 'react'
import Avatar from './(auth)/signin/Avatar'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSocket } from '@/providers/MyProvider'

type Props = {
    letter:string
    users:User[],
    currentUser:User
}

const ContactItem = ({letter,users,currentUser}: Props) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const handleClick = useCallback((id:string)=>{
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        current.set('with',id)
        router.push(`/?${current}`)
        router.refresh()
    },[])

    const {state} = useSocket()
  return (
    <div className=''>
        <p className='text-[#5b88a4] p-4'>{letter}</p>
        <div>
            {users.filter(el=>el?.name.includes(state.search)).map(user=>user?.id!==currentUser?.id&&<div onClick={()=>handleClick(user?.id.toString() as string)} className='pt-3 px-2 flex items-center gap-3 cursor-pointer hover:bg-primary' key={user?.id}>
                <Avatar sm image={user?.profileImg as string} />
                <div className='border-b pb-3 border-gray-800 w-full'>
                    <p className='capitalize text-white text-sm'>{user?.name}</p>
                    <p className='text-xs text-gray-400'>{user?.email}</p>
                </div>
            </div>)}
            
        </div>
    </div>
  )
}

export default ContactItem