'use client'

import ChatHeader from "@/components/ChatHeader"
import Empty from "./Empty"
import ChatBody from "@/components/ChatBody"

type Props = {}

const Content = (props: Props) => {

    if(!true) return   <Empty />
  return (
    <div className="bg-primary col-span-3  h-screen overflow-hidden flex flex-col">
        <ChatHeader />
        <ChatBody />
      
    </div>
  )
}

export default Content