'use client'

import { User } from '@/actions/getCurrentUser'
import { useSocket } from '@/providers/MyProvider'
import React, { useEffect } from 'react'
import CallContainer from './CallContainer'

type Props = {user:User,currentUser:User}

const VoiceComponent = ({user,currentUser}: Props) => {

    const {state} = useSocket()

    useEffect(() => {
      if (state.voiceCall && state.voiceCall.type === 'out-going') {
      state.newSocket?.emit('outgoing-voice-call',{to:state.voiceCall.id,
          from:{
id:currentUser?.id,
profileImage:currentUser?.profileImg,
name:currentUser?.name,


      },
  callType:state.voiceCall.callType,
  roomId:state.voiceCall.roomId
  
  }
  
  )

  console.log(state.voiceCall)
      }
    }, [state.voiceCall]);

    if(!state.voiceCall) return null


  

  return (
<CallContainer currentUser={currentUser} user={user} type='voice'/>
  )
}

export default VoiceComponent