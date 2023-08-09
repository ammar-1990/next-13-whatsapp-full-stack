'use client'

import { useSocket } from "@/providers/MyProvider"

type Props = {}

const IncomingVoiceCall = (props: Props) => {

const {state} = useSocket()

if(!state.inVoiceCall) return null

  return (
    <div className="h-screen w-screen flex items-center justify-center fixed inset-0 bg-white">IncomingVoiceCall</div>
  )
}

export default IncomingVoiceCall