import { getSession } from '@/actions/getCurrentUser'
import Image from 'next/image'
import SideBar from './SideBar'
import Content from './Content'

export default async function Home({searchParams }:{searchParams :{search?:string,with?:string}}) {
  const currentUser = await getSession()

  console.log('search',searchParams )
  if ((searchParams && Object.entries(searchParams).length === 0) || !searchParams){
    console.log('no')
  }
  return (
   <div className="grid grid-cols-4 h-screen w-screen overflow-hidden">
<SideBar currentUser={currentUser} />
<Content />

   </div>
  )
}
