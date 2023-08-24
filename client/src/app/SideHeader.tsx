'use client'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import Avatar from './(auth)/signin/Avatar'
import { User } from '@/actions/getCurrentUser'
import {MdOutlineMessage} from 'react-icons/md'
import {SlOptionsVertical} from 'react-icons/sl'
import {signOut} from'next-auth/react'
import Menu from './(auth)/signin/Menu'
import { useSocket } from '@/providers/MyProvider'

type Props = {
    currentUser:User,
    setMessages:Dispatch<SetStateAction<boolean>>
}

const SideHeader = ({currentUser,setMessages}: Props) => {
const {state} = useSocket()
  const [coordinates, setCoordinates] = useState({x:0,y:0})
  const [showMenue,setShowMenue] = useState(false)
  const spRef = useRef(null)

  const data = [
    {
      name:'Logout',
      callback:(e:React.MouseEvent)=>{
        e.stopPropagation()
        setShowMenue(false);
        state.newSocket?.emit('signout',currentUser?.id)
        signOut()

      }
    }
  ]


  const handleClick = (e:React.MouseEvent)=>{
    setCoordinates({x:e.pageX,y:e.pageY})
    setShowMenue(true)
  }
  return (
    <div className="flex items-center h-[70px] justify-between p-3">
    <Avatar sm image={currentUser?.profileImg as string} />
    <div className='flex items-center gap-6'>
        <span onClick={()=>setMessages(true)} className='cursor-pointer'><MdOutlineMessage color='white' size={20} /></span>
<span ref={spRef} className='cursor-pointer' onClick={handleClick}>
  {showMenue && <Menu avRef={spRef} coordinates={coordinates} data={data} setShowMenue={setShowMenue} />}
  <SlOptionsVertical title='Menue' color='white' size={20} /></span>

    </div>
</div>
  )
}

export default SideHeader 