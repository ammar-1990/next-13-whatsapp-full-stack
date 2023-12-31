import Image from 'next/image'
import React from 'react'
import TheForm from './TheForm'

import { getSession } from '@/actions/getCurrentUser'
import { redirect } from 'next/navigation'


type Props = {}

const page = async(props: Props) => {
const currentUser = await getSession()

if(currentUser) redirect('/')

  return (
    <div className='h-screen bg-primary flex items-center justify-center'>
     
      <div>
      <h1 className='text-center text-5xl mb-4 text-white'>Whatsapp</h1>
      <div className='flex flex-col sm:flex-row items-center gap-5 w-full justify-center '>
    <Image src='/images/whatsapp.gif' width={300} height={300} alt='logo' className='sm:w-64 w-28' />
    <div className='min-w-[300px] '>
<TheForm />

    </div>
</div>
      </div>

    </div>
  )
}

export default page