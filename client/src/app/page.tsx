import { getSession } from '@/actions/getCurrentUser'
import Image from 'next/image'

export default async function Home() {
  const currentUser = await getSession()
  return (
   <div className="text-green-500">whats app {currentUser?.name}</div>
  )
}
