'use client'

import { useCallback, useState } from "react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"


type Props = {}

const TheForm = (props: Props) => {
const [register, setRegister] = useState(false)
const [login, setLogin] = useState(true)

const handleLogin = useCallback(()=>{

  setTimeout(()=>{setRegister(false);  setLogin(true)},300)
},[setLogin,setRegister,login,register])

const handleRegister = useCallback(()=>{

  setTimeout(()=>{setLogin(false);  setRegister(true)},300)

},[setLogin,setRegister,login,register])


  return (
    <div className="p-3">
<RegisterForm register={register} toggle={handleLogin} />

<LoginForm login={login} toggle={handleRegister} />

    </div>
  )
}

export default TheForm