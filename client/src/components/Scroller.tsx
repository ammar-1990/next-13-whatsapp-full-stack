'use client'
import { Message } from '@/actions/getAllMessages'
import { useSocket } from '@/providers/MyProvider'
import React, { useEffect, useRef, useState } from 'react'

type Props = {allMessages:Message[]}

const Scroller = (allMessages: Props) => {

  const {state,dispatch}=useSocket()



    useEffect(()=>{
        myRef.current?.scrollIntoView()
   
    },[allMessages])

 

    const myRef = useRef<HTMLDivElement>(null)
  return (
    <div ref={myRef} />
  )
}

export default Scroller