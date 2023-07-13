'use client'
import { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
    setTakePhoto: React.Dispatch<React.SetStateAction<boolean>>,
    setImage:React.Dispatch<React.SetStateAction<string>>
}

const TakePhoto = ({setTakePhoto,setImage}: Props) => {
    const vRef = useRef<HTMLVideoElement>(null)
    useEffect(()=>{
let stream:MediaStream ;
const startCamera = async()=>{
    stream = await  navigator.mediaDevices.getUserMedia({
        video:true,
        audio:false
    })

    vRef.current!.srcObject=stream 
 
}

startCamera()

return ()=>{
stream.getTracks().forEach(track=>track.stop())
}

    },[])

   

    const handleClick = ()=>{
        const canvas = document.createElement('canvas')
        canvas.getContext('2d')?.drawImage(vRef.current as HTMLVideoElement,0,0,300,150)
        setImage(canvas.toDataURL("image/jpeg"))
        setTakePhoto(false)
    }
  return (
    <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-gray-900 h-2/4   w-4/5 sm:3/5 lg:w-2/5 relative rounded-lg flex items-center justify-center">
        <span
          onClick={() => setTakePhoto(false)}
          className="flex items-center justify-center p-3 absolute top-0 right-0 cursor-pointer"
        >
          <AiOutlineClose color="white" size={20} />
        </span>
        <video autoPlay width={300} ref={vRef} />
        <span onClick={handleClick} className="absolute bottom-1 cursor-pointer block w-12 h-12 rounded-full bg-white border-2 duration-300 active:scale-95 active:bg-teal-700 active:border-teal-700 hover:bg-teal-500  border-teal-500" />
        </div>
    </div>
  )
}

export default TakePhoto