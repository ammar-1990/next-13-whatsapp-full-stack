

import ChatHeader from "@/components/ChatHeader"
import Empty from "./Empty"
import ChatBody from "@/components/ChatBody"
import { getAllUsers } from "@/actions/getAllUsers"
import { User } from "@/actions/getCurrentUser"

type Props = {search?:string,with?:string}


const Content = async({searchParams}: {searchParams:Props}) => {

  const withUser = searchParams.with
  console.log(withUser)

  const user = await getAllUsers(withUser as string)
  console.log('the user',user)



  if (searchParams && !searchParams.with || !searchParams)
  {
      return <Empty />
  }



  return (
    <div className="bg-primary col-span-3  h-screen overflow-hidden flex flex-col">
        <ChatHeader user={user as User} />
        <ChatBody searchParams={searchParams} />
      
    </div>
  )
}

export default Content