'use client'
import axios from 'axios'
import { useCallback, useEffect, useState } from "react"
import Avatar from "./Avatar"
import toast from 'react-hot-toast'
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { REGISTER } from '@/libs/allRoutes'

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


  const router = useRouter()

  const handleSubmit = useCallback(async(e:React.FormEvent)=>{
    e.preventDefault()
    setState(prev=>({...prev,isLoading:true}))
 
    try {
      await axios.post(REGISTER,{name:state.name,email:state.email,password:state.password,profileImg:image})
   console.log(state)
      toast.success('Account is created successfully')
      signIn('credentials',{email:state.email,password:state.password,redirect:false}).then((callback) => {
        if(!callback?.error){
         toast.success('Logged in')
         router.push('/')
         setState({email:'',name:'',password:'',isLoading:false})
       
       
        }
     
       if(callback?.error) {
     
         setState(prev=>({...prev,loading:false}))
     
           toast.error('Invalid credentials')
       }
       });
  
  setImage('/images/avatars/default.png')
    } catch (error:any) {
      console.log(error)
      toast.error(error.response.data)
    }finally {
      
      setState(prev=>({...prev,isLoading:false}))
    }
  
  
  },[state.name,state.email,state.password,state.isLoading,image,router,axios])


    if(!register) return null



  return (
    <form onSubmit={handleSubmit} className={`${!show ? 'opacity-0 -translate-y-8':' opacity-100'} relative duration-300 max-w-[300px] lg:min-w-[450px] space-y-3`}>

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