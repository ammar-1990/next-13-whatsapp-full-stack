'use client' 

import { User } from '@/actions/getCurrentUser'
import { useSocket } from '@/providers/MyProvider'
import Image from 'next/image'
import {useState} from 'react'
import {MdCallEnd} from 'react-icons/md'

type Props = {user : User,
type:'voice' | "video",
currentUser:User
}

const CallContainer = ({user,currentUser,type}: Props) => {

    const {state,dispatch} = useSocket()

    const [callAccepted, setCallAccepted] = useState(false)


    const endCall = ()=>{
      dispatch({type:'END_CALL'})

      if(type==='voice'){
        state.newSocket?.emit('reject-voice-call',{from:user?.id})
      }
      else{
        state.newSocket?.emit('reject-video-call',{from:user?.id})
      }
     
    }
  return (
    <div className='fixed inset-0 w-full h-screen flex flex-col gap-3 items-center justify-center bg-secondary text-white'>
        <div className='text-center'> 
                   <p className='font-bold text-2xl '>{user?.name}</p>
<p>
{callAccepted && type!=='video' ? 'On going call...': 'Calling' }
</p>
</div>


{!callAccepted && <Image alt='image' src={user?.profileImg as string} height={300} width={300} className='my-24 rounded-full' />}

<span className='w-16 h-16 rounded-full bg-red-600 flex items-center justify-center' onClick={endCall}>
    <MdCallEnd className='cursor-pointer text-3xl'  />
</span>
    </div>
  )
}

export default CallContainer