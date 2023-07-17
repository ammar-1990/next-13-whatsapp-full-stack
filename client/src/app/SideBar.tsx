'use client'

import { User } from "@/actions/getCurrentUser"
import Avatar from "./(auth)/signin/Avatar"
import SideHeader from "./SideHeader"
import SearchComponent from "./SearchComponent"
import List from "./List"
import { useState } from "react"
import ContactsHeader from "./ContactsHeader"
import ContactsBody from "./ContactsBody"
import { AllUsers } from "@/actions/getAllUsers"


type Props = {
    currentUser: User ,
    allUsers:AllUsers
}

const SideBar = ({currentUser,allUsers}: Props) => {

  const [messages, setMessages] = useState(false)
  return (
    <div className=" col-span-1 flex flex-col bg-primary">
      {
        !messages ? ( <div className="  flex flex-col h-screen">
        <SideHeader currentUser={currentUser} setMessages={setMessages} />
        <div className="flex-1 bg-secondary flex flex-col">
        <SearchComponent />
        <List allUsers={allUsers}/>
        
        </div>
        </div>):(
          <div className="flex flex-col h-screen">
<ContactsHeader setMessages={setMessages} />
<ContactsBody allUsers={allUsers}/>
          </div>
        )
      }
     

      

    </div>
  )
}

export default SideBar