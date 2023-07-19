

import ChatHeader from "@/components/ChatHeader"
import Empty from "./Empty"
import ChatBody from "@/components/ChatBody"
import { getAllUsers } from "@/actions/getAllUsers"
import { User } from "@/actions/getCurrentUser"

type Props = {search?:string,with?:string}


const Content = async({searchParams}: {searchParams:Props}) => {

  const withUser = searchParams.with


  const user = await getAllUsers(withUser as string)




  if (searchParams && !searchParams.with || !searchParams)
  {
      return <Empty />
  }

if(searchParams && searchParams.with && !user) return (<div className="bg-primary col-span-3  h-screen overflow-hidden flex items-center justify-center">
  <p className="text-lg text-gray-600">Invalid User ID</p>
</div>)

  return (
    <div className="bg-primary col-span-3  h-screen overflow-hidden flex flex-col">
        <ChatHeader user={user as User} />
        <ChatBody searchParams={searchParams} />
      
    </div>
  )
}

export default Content