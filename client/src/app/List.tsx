'use client'

import { AllUsers } from "@/actions/getAllUsers"


type Props = {
  allUsers:AllUsers
}

const List =  ({allUsers}: Props) => {


  return (

    <div className="mt-2 myScroll flex-1  ">List</div>
  )
}

export default List