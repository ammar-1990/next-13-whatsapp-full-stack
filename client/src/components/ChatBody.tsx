


import { getAllUsers } from "@/actions/getAllUsers"
import ChatComponent from "./ChatComponent"
import ChatContainer from "./ChatContainer"
import { User, getSession } from "@/actions/getCurrentUser"

type Props = {
  searchParams:{search?:string,with?:string}
}

const ChatBody = async({searchParams}: Props) => {

  const withUser = searchParams.with
  const theuser =  getAllUsers(withUser as string)
  const thecurrentUser =  getSession()

  const [user,currentUser] = await Promise.all([theuser,thecurrentUser])

  return (
    <div className="flex-1 bg-[#12181c] border-l border-l-gray-700 flex flex-col">
<ChatContainer user={user as User} currentUser={currentUser as User} />
      <ChatComponent user={user as User} currentUser ={currentUser} />

    </div>
  )
}

export default ChatBody