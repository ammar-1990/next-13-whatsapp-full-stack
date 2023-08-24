'use client'
import toast from 'react-hot-toast'
import { useCallback, useEffect, useState } from "react"
import { signIn,signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

type Props = {
    login:boolean,
    toggle:()=>void
}

const LoginForm = ({login,toggle}: Props) => {
const[show, setShow]=useState(false)
useEffect(()=>{
  setShow(login)
},[login])
const [state,setState] = useState({email:'',
password:'',
loading:false
})

if(!login) return null

const router = useRouter()
const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
e.preventDefault()
setState(prev=>({...prev,loading:true}))


 signIn('credentials',{email:state.email,password:state.password,redirect:false}).then((callback) => {
   if(!callback?.error){
    toast.success('Logged in')
    router.push('/')
    setState({email:'',
    password:'',
    loading:false
    })
  
   }

  if(callback?.error) {

    setState(prev=>({...prev,loading:false}))

      toast.error('Invalid credentials')
  }
  });



    


}


  return (
    <form onSubmit={handleSubmit} className={`${!show ? 'opacity-0 translate-y-8':'translate-y-0 opacity-100'} duration-300  max-w-[300px] lg:min-w-[450px]`}>
    
<h3 className="text-white">Login</h3>
<div className="my-2 space-y-2">
<input type="email" required className="input" placeholder="E-mail" onChange={e=>setState(prev=>({...prev,email:e.target.value}))} value={state.email}/>
<input type="password" required className="input" placeholder="Password"  onChange={e=>setState(prev=>({...prev,password:e.target.value}))} value={state.password} />
<button disabled={!state.email || !state.password || state.loading} type="submit" className="button disabled:bg-gray-400">{state.loading ? 'Logging in ...':"Login"}</button>

</div>

<p className="text-white text-xs ">Don't have an account? <span onClick={()=>{toggle(),setShow(false)}} className="hover:underline cursor-pointer">Signup.</span></p>
    </form>
  )
}

export default LoginForm