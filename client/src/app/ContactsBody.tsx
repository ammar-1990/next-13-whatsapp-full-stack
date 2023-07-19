'use client'
import { AllUsers } from "@/actions/getAllUsers"
import SearchComponent from "./SearchComponent"
import ContactItem from "./ContactItem"
import { User } from "@/actions/getCurrentUser"


type Props = {
  allUsers:AllUsers
  currentUser:User
}

const ContactsBody = ({allUsers,currentUser}: Props) => {
  console.log(allUsers)
  return (
    <div className="flex flex-1 flex-col overflow-y-scroll myScroll bg-secondary py-2">
      <div className="px-2">
      <SearchComponent arrow />
      </div>
  
        <div className=" flex-1 flex flex-col  ">
          {allUsers === null ? <p className="text-gray-400">No users</p>:
       Object.entries(allUsers).map(([letter,users],i)=>(users.length===1 && users[0].id === currentUser?.id) ? null : <ContactItem  key={i} letter={letter} users={users}/>

       )}


        </div>
    </div>
  )
}

export default ContactsBody