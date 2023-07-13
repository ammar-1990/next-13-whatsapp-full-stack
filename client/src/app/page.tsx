import { getSession } from '@/actions/getCurrentUser'
import Image from 'next/image'
import SideBar from './SideBar'

export default async function Home() {
  const currentUser = await getSession()
  return (
   <div className="grid grid-cols-4 h-screen w-screen overflow-hidden">
<SideBar currentUser={currentUser} />

   </div>
  )
}
