'use client'

import { useCallback, useEffect, useState } from "react"
import Avatar from "./Avatar"

type Props = {
    register:boolean,
    toggle:()=>void
}

const RegisterForm = ({register,toggle}: Props) => {
  const[show, setShow]=useState(false)
  const [image, setImage] = useState('/images/avatars/default.png')
  const [state, setState]=useState({email:'',name:'',password:'',isLoading:false})
  useEffect(()=>{
   setShow(register)
    
  },[register])


    if(!register) return null





  return (
    <form className={`${!show ? 'opacity-0 -translate-y-8':' opacity-100'} relative duration-300 max-w-[300px] lg:min-w-[450px] space-y-3`}>

      <h3 className="text-white">Register</h3>
      <Avatar image={image} setImage={setImage} />
      <input className="input" placeholder="E-mail" type="email" required value={state.email} onChange={e=>setState(prev=>({...prev,email:e.target.value}))}/>
      <input className="input" placeholder="Name" type="text" required value={state.name} onChange={e=>setState(prev=>({...prev,name:e.target.value}))}/>
      <input className="input" placeholder="Password" type="password" required value={state.password} onChange={e=>setState(prev=>({...prev,password:e.target.value}))}/>
      <button disabled={!state.email || !state.name || !state.password || state.isLoading} type="submit" className="button disabled:bg-gray-400">{state.isLoading?'Signing up...':'Register'}</button>
 
      <p className="text-white text-xs">Already have an account? <span onClick={()=>{toggle(),setShow(false)}} className="hover:underline cursor-pointer">Signin.</span></p>
    </form>
  )
}

export default RegisterForm