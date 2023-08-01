'use client'

import { AllUsers } from "@/actions/getAllUsers"
import { StartUp } from "@/actions/getStartUp"
import Avatar from "./(auth)/signin/Avatar"
import {useCallback} from 'react'
import { useRouter, useSearchParams } from "next/navigation"
import { User } from "@/actions/getCurrentUser"
import { BsCheck2, BsCheck2All } from "react-icons/bs"
import {formatDistanceToNow} from 'date-fns'
import { FaCamera, FaMicrophone } from "react-icons/fa"
import { useSocket } from "@/providers/MyProvider"


type Props = {
  currentUser:User,
  myStartUp:StartUp
}

const List =  ({currentUser,myStartUp}: Props) => {

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



    <div className={`mt-2 myScroll flex-1  `}>
      {myStartUp?.users?.filter((acc)=>acc.name.includes(state.search)).length === 0 && <p className="text-center text-xs text-gray-300">No such user</p>}
      {myStartUp?.users?.filter((acc)=>acc.name.includes(state.search)).map((user)=><div onClick={()=>handleClick(user?.id.toString() as string)} className={`pt-3 px-2 flex items-center gap-3 cursor-pointer hover:bg-primary ${searchParams.get('with')=== user?.id.toString() && 'bg-primary'}`} key={user?.id}>
                <Avatar sm image={user?.profileImg as string} />
                <div className='border-b pb-3 border-gray-800 w-full'>
                  <div className="flex items-center justify-between">   <p className='capitalize text-white text-sm'>{user?.name}</p>
                  <span className={`text-xs  ${user.totalUnreadMessages > 0 && searchParams.get('with')!==user.id.toString()   ? 'text-green-500' :'text-gray-300' }`}>{formatDistanceToNow(new Date(user.createdAt))}</span>
                  </div>
                 <div className="flex items-center justify-between mt-3">
                 <div className="flex gap-2 items-center ">
                    {user.senderId === currentUser?.id &&<span>
      
      {user.messageStatus === 'sent' && <BsCheck2 color='white' size={12} />}
      {user.messageStatus === 'delivered' && <BsCheck2All color='white' size={12} />}
      {user.messageStatus === 'read' && <BsCheck2All className='text-blue-400' size={12} />}
      </span>}
      {user?.type==='text'&&<p className="text-sm text-gray-300 truncate">{user?.message}</p>}
      {user?.type==='audio'&&<span className="text-sm text-gray-300 flex items-center gap-1"><FaMicrophone size={12} /> Audio</span>}
      {user?.type==='image'&&<span className="text-sm text-gray-300 flex items-center gap-1"><FaCamera size={12} /> Image</span>}
                    </div>
                    {user.totalUnreadMessages > 0 && searchParams.get('with')!==user.id.toString() &&<span className="p-2 text-xs w-5 h-5 flex items-center justify-center bg-green-500 text-gray-300 rounded-full">{user.totalUnreadMessages}</span>}
                 </div>
                
          
                </div>
            </div>)}
    </div>
  )
}

export default List