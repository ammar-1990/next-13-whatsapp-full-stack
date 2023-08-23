'use client'

import { User } from '@/actions/getCurrentUser'
import { useSocket } from '@/providers/MyProvider'
import React, { useEffect } from 'react'
import CallContainer from './CallContainer'

type Props = {user:User,currentUser:User}

const VideoComponent = ({user,currentUser}: Props) => {


    const {state} = useSocket()

    useEffect(() => {
      if (state.videoCall && state.videoCall.type === 'out-going') {
      state.newSocket?.emit('outgoing-video-call',{to:state.videoCall.id,
          from:{
id:currentUser?.id,
profileImage:currentUser?.profileImg,
name:currentUser?.name,


      },
  callType:state.videoCall.callType,
  roomId:state.videoCall.roomId
  
  }
  
  )


      }
    }, [state.videoCall]);

if(!state.videoCall) return null

  return (
<CallContainer currentUser={currentUser}  user={user} type='video' callType={state.videoCall.type} roomId={state.videoCall.roomId} />
  )
}

export default VideoComponent