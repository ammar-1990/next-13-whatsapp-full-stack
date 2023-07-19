'use client'
import { Message } from '@/actions/getAllMessages'
import React, { useEffect, useRef } from 'react'

type Props = {allMessages:Message[]}

const Scroller = (allMessages: Props) => {

    useEffect(()=>{
        myRef.current?.scrollIntoView()
    },[allMessages])

    const myRef = useRef<HTMLDivElement>(null)
  return (
    <div ref={myRef} />
  )
}

export default Scroller