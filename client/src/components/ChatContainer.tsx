import React from 'react'

type Props = {}

const ChatContainer = (props: Props) => {
  return (
    <div className='flex-1  overflow-y-auto  relative text-white flex flex-col '>
<div className='absolute bg-fixed inset-0 bg-chat-background opacity-5 z-[0]' /> 
<div className='text-white flex-1 relative myScroll p-4'>

</div>
    </div>
  )
}

export default ChatContainer