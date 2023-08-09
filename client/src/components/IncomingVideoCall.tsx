'use client'

import Avatar from "@/app/(auth)/signin/Avatar"
import { useSocket } from "@/providers/MyProvider"

type Props = {}



const IncomingVideoCall = (props: Props) => {

const {state,dispatch} = useSocket()


if(!state.inVideoCall) return null

const acceptCall = ()=>{
dispatch({type:'videoCall',payload:{...state.inVideoCall,type:'in-coming'}})

state.newSocket?.emit('accept-incoming-call',{id:state.inVideoCall.id})
dispatch({type:'inVideoCall',payload:undefined})

}

const rejectCall = ()=>{
    state.newSocket?.emit('reject-video-call',{from:state.inVideoCall.id})
dispatch({type:'END_CALL'})
}

  return (
    <div className="flex w-[350px] h-[200px] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-secondary/60 backdrop-blur-2xl border-2 border-green-600 rounded-sm p-4  gap-2">
<Avatar sm image={state.inVideoCall.profileImage as string} />
<div className="flex flex-col gap-2 flex-1 items-center"> 
    <p className="text-white text-2xl">{state.inVideoCall?.name}</p>
    <p className="text-white">Incoming Video Call</p>
    <div className="flex justify-center items-center gap-4">
        <button onClick={rejectCall} className="py-2 px-4 rounded-full bg-red-500">Reject</button>
        <button onClick={acceptCall} className="py-2 px-4 rounded-full bg-green-500">Accept</button>
    </div>
</div>
        
    </div>
  )
}

export default IncomingVideoCall