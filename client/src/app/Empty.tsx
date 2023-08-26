'use client'
import Image from "next/image"
import { useSocket } from "@/providers/MyProvider"


type Props = {}

const Empty = (props: Props) => {
  const {dispatch} = useSocket()
  return (
    <div className="flex items-center justify-center col-span-3  bg-primary  border-l border-l-gray-700 border-b-4 border-b-green-500 h-screen overflow-hidden">
        <Image src={'/images/whatsapp.gif'} alt="symbole" width={300} height={300} onClick={()=>dispatch({type:'SHOW_CHAT'})} />

    </div>
  )
}

export default Empty