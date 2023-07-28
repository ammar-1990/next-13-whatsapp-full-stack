'use client'

import { Message } from '@/actions/getAllMessages'
import { User } from '@/actions/getCurrentUser'
import Avatar from '@/app/(auth)/signin/Avatar'
import { THE_SERVER } from '@/libs/allRoutes'

import {  formatDistanceToNow } from 'date-fns'
import React, { useRef, useState ,useEffect} from 'react'
import { BsCheck2, BsCheck2All } from 'react-icons/bs'
import { FaPlay, FaStop } from 'react-icons/fa'
import WaveSurfer from 'wavesurfer.js'

type Props = {

    user:User,
    currentUser:User,
    message:Message
}

const VoiceMessage = ({user,currentUser,message}: Props) => {

const [audioMessage, setAudioMessage] = useState<HTMLAudioElement | null >(null)
const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
const [totalDuration, setTotalDuration] = useState<number | undefined>(0);
const [isPlaying, setIsPlaying] = useState(false);



const waveFormRef = useRef<HTMLDivElement>(null);

const waveform = useRef<WaveSurfer | null >(null)

    const handlePlayAudio = () => {
        if(audioMessage){
            waveform.current?.stop();
            waveform.current?.play();
            audioMessage.play();
            setIsPlaying(true)
    
        }
      }
    
      const handlePauseAudio = () => {
        if(waveform){
            waveform.current?.stop();
            audioMessage?.pause();
            setIsPlaying(false)
        }
       
    
      }

      useEffect(() => {
   
if(waveform.current ===null)
{
        waveform.current = WaveSurfer.create({
            container:waveFormRef.current!,
            waveColor:'#ccc',
            progressColor:'#419eff',
            cursorColor:"#7ae3c3",
            barWidth:2,
            height:30,
            responsive:true
          })  
       
        
          waveform.current?.on('finish',()=>{
            setIsPlaying(false)
          })
    
return ()=>waveform.current?.destroy()
        }
}, [])


      useEffect(()=>{
        if(audioMessage){
            const updatePlaybackTime = ()=>{
                setCurrentPlaybackTime(audioMessage.currentTime);
            }
            audioMessage.addEventListener('timeupdate',updatePlaybackTime)
            return ()=>{
                audioMessage.removeEventListener('timeupdate',updatePlaybackTime)
            }
        }
    },[audioMessage])


    const formatTime = (time:number)=>{
        if(isNaN(time)) return "00:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`
      }


      useEffect(()=>{
        const audioURL = `${THE_SERVER}${message.message}`
        const audio = new Audio(audioURL)
        setAudioMessage(audio)
        waveform.current?.load(audioURL)
        waveform.current?.on('ready',()=>{
            setTotalDuration(waveform.current?.getDuration())
        })

      },[message.message])

  return (
    <div className={`${currentUser?.id === message.senderId ? ' bg-green-700/40': 'bg-zinc-700/40'} p-4 rounded-md flex items-center gap-4`}>

        <Avatar md image={message.senderId === currentUser?.id ? currentUser?.profileImg as string : user?.profileImg as string} />
        <div className='text-white cursor-pointer'>
            {isPlaying ? <FaStop onClick={handlePauseAudio} /> : <FaPlay onClick={handlePlayAudio} />}
        </div>

        <div className='relative '>
            <div ref={waveFormRef} className='w-60'>
                <div className='flex justify-between text-xs text-white items-center absolute -bottom-5 right-1 w-full'>
                    <span className='text-[10px]'>
                    {formatTime(isPlaying ? currentPlaybackTime : totalDuration as number)}
                    </span>
                    <div className='flex gap-1 items-center'>
                    <span className='text-zinc-200  flex-shrink-0 text-[10px]'>{formatDistanceToNow(new Date(message.createdAt))}</span>
                    {message.senderId === currentUser?.id &&<span>
      
      {message.messageStatus === 'sent' && <BsCheck2 color='white' size={15} />}
      {message.messageStatus === 'delivered' && <BsCheck2All color='white' size={15} />}
      {message.messageStatus === 'read' && <BsCheck2All className='text-blue-400' size={15} />}
      </span>}
                    </div>
            
                </div>
            </div>
        </div>

    </div>
  )
}

export default VoiceMessage