


import ChatComponent from "./ChatComponent"
import ChatContainer from "./ChatContainer"

type Props = {
  searchParams:{search?:string,with?:string}
}

const ChatBody = async({searchParams}: Props) => {

  return (
    <div className="flex-1 bg-[#12181c] border-l border-l-gray-700 flex flex-col">
<ChatContainer/>
      <ChatComponent />

    </div>
  )
}

export default ChatBody