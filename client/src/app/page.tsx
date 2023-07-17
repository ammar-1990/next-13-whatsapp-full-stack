import { getSession } from '@/actions/getCurrentUser'
import Image from 'next/image'
import SideBar from './SideBar'
import Content from './Content'
import { getAllUsers } from '@/actions/getAllUsers'



export default async function Home({searchParams }:{searchParams :{search?:string,with?:string}}) {
  const currentUser = await getSession()

  

  console.log('search',searchParams )
  if ((searchParams && Object.entries(searchParams).length === 0) || !searchParams){

  }

  const allUsers = await getAllUsers()
  console.log(allUsers)


  return (
   <div className="grid grid-cols-4 h-screen w-screen overflow-hidden">
<SideBar currentUser={currentUser} allUsers={allUsers}/>
<Content  searchParams={searchParams}/>

   </div>
  )
}
