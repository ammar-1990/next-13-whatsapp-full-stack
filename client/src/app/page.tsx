import { getSession } from '@/actions/getCurrentUser'
import Image from 'next/image'
import SideBar from './SideBar'
import Content from './Content'
import { getAllUsers } from '@/actions/getAllUsers'
import { startUp } from '@/actions/getStartUp'


export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home({searchParams }:{searchParams :{search?:string,with?:string}}) {
  const currentUser = await getSession()

  const myStartUp = await startUp(currentUser?.id)




  if ((searchParams && Object.entries(searchParams).length === 0) || !searchParams){

  }

  const allUsers = await getAllUsers()



  return (
   <div className="md:grid md:grid-cols-4 h-screen w-screen overflow-hidden">
<SideBar currentUser={currentUser} allUsers={allUsers} myStartUp={myStartUp} />

<Content currentUser={currentUser}  searchParams={searchParams}/>



   </div>
  )
}
