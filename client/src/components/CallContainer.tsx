'use client' 

import { User } from '@/actions/getCurrentUser'
import { CALL_TOKEN } from '@/libs/allRoutes'
import { useSocket } from '@/providers/MyProvider'
import axios from 'axios'
import Image from 'next/image'
import {useEffect, useState} from 'react'
import {MdCallEnd} from 'react-icons/md'
import { ZegoExpressEngine } from 'zego-express-engine-webrtc'

type Props = {user : User,
type:'voice' | "video",
currentUser:User,
callType:string,
roomId:Date
}

const CallContainer = ({user,currentUser,type,callType,roomId}: Props) => {

    const {state,dispatch} = useSocket()

    const [callAccepted, setCallAccepted] = useState(false)
    const [token, setToken] = useState(undefined)
    const [zgvar, setZgvar] = useState<ZegoExpressEngine | undefined>(undefined)
    const [localStream, setlocalStream] = useState<MediaStream | undefined>(undefined)
    const [publishStream, setPublishStream] = useState<string | undefined>(undefined)


    const endCall = ()=>{
   
if(zgvar && localStream && publishStream ){
  zgvar.destroyStream(localStream)
  zgvar.stopPublishingStream(publishStream)
  zgvar.logoutRoom(roomId.toString())
}
      if(type==='voice'){
        state.newSocket?.emit('reject-voice-call',{from:user?.id})
      }
      else{
        state.newSocket?.emit('reject-video-call',{from:user?.id})
      }
      dispatch({type:'END_CALL'})
    }


    useEffect(()=>{
      if(callType==='out-going'){
        console.log('work')
        state.newSocket?.on('accept-call',()=>{setCallAccepted(true)})
      }
      else{
        setTimeout(()=>{setCallAccepted(true)},1000)
      }
    },[callType])

useEffect(()=>{
  const getToken = async()=>{
try {
  const res = await axios.get(`${CALL_TOKEN}/${currentUser?.id}`)
  setToken(res.data)
  console.log('token',res.data)
} catch (error) {
  console.log(error)
}
  }

  getToken()
},[callAccepted])

useEffect(()=>{
  
    const startCall = async()=>{
      import('zego-express-engine-webrtc').then(async({ZegoExpressEngine})=>{
        const zg = new ZegoExpressEngine(process.env.NEXT_PUBLIC_ZEGO_APP_ID as unknown as number,process.env.NEXT_PUBLIC_ZEGO_SERVER_ID as string)
        setZgvar(zg)
        zg.on('roomStreamUpdate',async(roomID,updateType,streamList,extendedData)=>{
          if(updateType === 'ADD'){

            const rmVideo = document.getElementById('remote-video')
           const vd = document.createElement(type === 'video' ? 'video' : 'audio')
           vd.id = streamList[0].streamID
           vd.autoplay = true
           if (vd instanceof HTMLVideoElement) {
            vd.playsInline = true;
          }
           vd.muted = false
           if(rmVideo){
            rmVideo.appendChild(vd)
           }
           zg.startPlayingStream(streamList[0].streamID,{audio:true,video:type==='video'?true:false}).then((stream)=>{vd.srcObject=stream})
         
          }else if(updateType==='DELETE' && zg && localStream && streamList[0].streamID)
          {
zg.destroyStream(localStream)
zg.stopPublishingStream(streamList[0].streamID)
zg.logoutRoom(roomID.toString())
dispatch({type:'END_CALL'})
          }
          
        

        });
        await zg.loginRoom(roomId.toString(),token!,{userID:currentUser?.id.toString() as string,userName:currentUser?.name},{userUpdate:true})  
        const localStream = await zg.createStream({
          camera:{
            audio:true,
            video:type==='video'? true : false
          }
        })
        
        const localVideo = document.getElementById('local-audio')
        const videoElement = document.createElement(type === 'video' ? 'video' : 'audio')
            videoElement.id='video-local-zego'   
            videoElement.className='h-28 w-32' 
            videoElement.autoplay=true
            videoElement.muted=false
            if (videoElement instanceof HTMLVideoElement) {
              videoElement.playsInline = true;
            }
            
              localVideo?.appendChild(videoElement)
              const td = document.getElementById('video-local-zego') as HTMLVideoElement | HTMLAudioElement
              td.srcObject=localStream
            
       
            const streamID ='123' + Date.now()
            setPublishStream(streamID)
            setlocalStream(localStream)
            zg.startPublishingStream(streamID,localStream)
     

    
      
      }
      
      
      )
  
    }
  

  if(token){
    startCall()
  }
},[token])

  return (
    <div className='fixed inset-0 w-full h-screen flex flex-col gap-3 items-center justify-center bg-secondary text-white'>
        <div className='text-center'> 
                   <p className='font-bold text-2xl '>{user?.name}</p>
<p>
{callAccepted && type!=='video' ? 'On going call...': 'Calling' }
</p>
</div>


{!callAccepted && <Image alt='image' src={user?.profileImg as string} height={300} width={300} className='my-24 rounded-full' />}
<div className='relative my-5 ' id='remote-video'>
  <div className="absolute bottom-5 right-5" id='local-audio'></div>
</div>

<span className='w-16 h-16 rounded-full bg-red-600 flex items-center justify-center' onClick={endCall}>
    <MdCallEnd className='cursor-pointer text-3xl'  />
</span>
    </div>
  )
}

export default CallContainer