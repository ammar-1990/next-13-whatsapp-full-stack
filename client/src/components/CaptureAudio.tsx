"use client";
import { User } from "@/actions/getCurrentUser";
import WaveSurfer from 'wavesurfer.js'
import { useSocket } from "@/providers/MyProvider";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { BiSolidMicrophone } from "react-icons/bi";
import { BsTrashFill } from "react-icons/bs";
import { FaPauseCircle, FaPlay, FaStop } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ADD_AUDIO } from "@/libs/allRoutes";


type Props = {
  hide: Dispatch<SetStateAction<boolean>>;
  currentUser: User;
  user: User;
};

const CaptureAudio = ({ hide,currentUser,user }: Props) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isSending, setIsSending] = useState(false)
  const [recordedAudio, setRecordedAudio] = useState< HTMLAudioElement | null>(null);
  const [waveform, setWaveform] = useState<WaveSurfer | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [renderedAudio, setRenderedAudio] = useState<File | null>(null)

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const waveFormRef = useRef<HTMLDivElement>(null);

  const {
    state: { newSocket },
  } = useSocket();



  const handleStartRecording = () => {
  
    setRecordingDuration(0)
    setCurrentPlaybackTime(0)
    setTotalDuration(0)
    setIsRecording(true)
    setRecordedAudio(null)
    navigator.mediaDevices.getUserMedia({audio:true}).then((stream)=>{
        const mediaRecorder = new MediaRecorder(stream)
        mediaRecorderRef.current = mediaRecorder
        if (audioRef.current) {
            audioRef.current.srcObject = stream;

            const chunks:any = []
            mediaRecorder.ondataavailable= (e) => chunks.push(e.data)
            mediaRecorder.onstop=()=>{
                const blob = new Blob(chunks,{type:'audio/ogg; codecs=opus'})
                const audioURL = URL.createObjectURL(blob);
                const audio = new Audio(audioURL);
                setRecordedAudio(audio)
                

                waveform?.load(audioURL)
            }

            mediaRecorder.start()
          }

    
    }).catch((error)=>{console.log(error)})

  }

  const handleStopRecording = () => {
if(mediaRecorderRef.current && isRecording){
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    waveform?.stop()


    const audioChunks:any = [];
    mediaRecorderRef.current.addEventListener('dataavailable',(event)=>{
audioChunks.push(event.data)
    });

    mediaRecorderRef.current.addEventListener('stop',()=>{
        const audioBlob = new Blob(audioChunks, {type:"audio/mp3"});
        const audioFile = new File([audioBlob],"recording.mp3");
        setRenderedAudio(audioFile)
    })
}


  }

  const handlePlayRecording = () => {
    if(recordedAudio){
        waveform?.stop();
        waveform?.play();
        recordedAudio.play();
        setIsPlaying(true)

    }
  }

  const handlePauseRecording = () => {
    if(waveform){
        waveform.stop();
        recordedAudio?.pause();
        setIsPlaying(false)
    }
   

  }

const router = useRouter()

  const sendRecording = useCallback(async()=>{
    const formData = new FormData()
    if(renderedAudio){
        formData.append('audio',renderedAudio)
        setIsSending(true)
        try {
          const {data} = await axios.post(ADD_AUDIO + `?from=${currentUser?.id}&to=${user?.id}`,formData,{headers:{'content-type': 'multipart/form-data' }})
          console.log(data.message)
         newSocket?.emit('send-msg',{to:user?.id,from:currentUser?.id,message:data.message,type:'audio'})
       hide(false)
          toast.success('Audio is sent')
        router.refresh()
        } catch (error) {
          console.log(error) 
        }finally{
            setIsSending(false)
        }
    }
  
    


  },[renderedAudio,axios,router,newSocket,toast,hide])


useEffect(() => {
   

        const wavesurfer = WaveSurfer.create({
            container:waveFormRef.current!,
            waveColor:'#ccc',
            progressColor:'#419eff',
            cursorColor:"#7ae3c3",
            barWidth:2,
            height:30,
            responsive:true
          })  
          setWaveform(wavesurfer)
          wavesurfer.on('finish',()=>{
            setIsPlaying(false)
          })
    
return ()=>wavesurfer.destroy()

}, [])


useEffect(()=>{
if(waveform) handleStartRecording()

},[waveform])


useEffect(()=>{
    let interval:any

    if(isRecording) {
        interval = setInterval(()=>{

            setRecordingDuration(prev=>{setTotalDuration(prev+1);return prev+1})
        },1000)
    }

    return ()=>clearInterval(interval)
},[isRecording])


useEffect(()=>{
    if(recordedAudio){
        const updatePlaybackTime = ()=>{
            setCurrentPlaybackTime(recordedAudio.currentTime);
        }
        recordedAudio.addEventListener('timeupdate',updatePlaybackTime)
        return ()=>{
            recordedAudio.removeEventListener('timeupdate',updatePlaybackTime)
        }
    }
},[recordedAudio])


  const formatTime = (time:number)=>{
    if(isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`
  }
  
  return (
    <div className="flex justify-end w-full items-center">
      <button type="button" onClick={() => hide(false)} className="text-white">
        <BsTrashFill size={18} />
      </button>
      <div className="flex items-center justify-center mx-2 py-2 px-4 gap-3 bg-secondary rounded-full">
        {isRecording ? (
          <div className="text-red-500 animate-pulse ">
            Recording <span>{recordingDuration}s</span>
          </div>
        ) : (
          <div className="text-white  rounded-full">
            {recordedAudio && (
              <>
                {!isPlaying ? (
                  <FaPlay
                    role="button"
                    size={18}
                    onClick={handlePlayRecording}
                  />
                ) : (
                  <FaStop
                    role="button"
                    size={18}
                    onClick={handlePauseRecording}
                  />
                )}
              </>
            )}
          </div>
        )}

        <div className="w-60 " hidden={isRecording} ref={waveFormRef} />
        {recordedAudio && isPlaying && <span className="text-white">{formatTime(currentPlaybackTime)}</span>}
        {recordedAudio && !isPlaying && <span className="text-white">{formatTime(totalDuration)}</span>}

        <audio ref={audioRef} hidden />
        </div>
        <div className="mr-4">
          {!isRecording ? (
            <BiSolidMicrophone
              role="button"
              onClick={handleStartRecording}
              className="text-red-500"
              size={18}
            />
          ) : (
            <FaPauseCircle
              role="button"
              onClick={handleStopRecording}
              className="text-red-500"
              size={18}
            />
          )}
        </div>
        <button  disabled={!renderedAudio || isSending} type="button" className="disabled:opacity-40" onClick={sendRecording}>   <MdSend color="white" title="send" /></button>
      

   
    </div>
  );
};

export default CaptureAudio;
