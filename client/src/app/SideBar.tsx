'use client'

import { User } from "@/actions/getCurrentUser"
import Avatar from "./(auth)/signin/Avatar"
import SideHeader from "./SideHeader"
import SearchComponent from "./SearchComponent"


type Props = {
    currentUser: User 
}

const SideBar = ({currentUser}: Props) => {
  return (
    <div className="col-span-1 bg-primary ">
<SideHeader currentUser={currentUser} />
<SearchComponent />
      

    </div>
  )
}

export default SideBar