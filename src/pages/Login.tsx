import { useState } from "react"
import assets from "../assets/assets"
import './css/login.css'
import { signup, login } from "../config/firebase"

const Login = () => {

  const [signstate,setSignState] = useState('Sign Up')
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const onSubmithandler = (e:React.FormEvent)=>{
    e.preventDefault()
    if(signstate==="Sign Up"){
      signup(username,email,password)
    }
    else{
      login(email,password)   
    }
  }


  return (
    <div className="login min-h-[100vh] flex items-center justify-evenly">
      <img src={assets.logo_big} alt="" className="logo w-[max(20vw,200px)]" />
      <form className="login-form bg-white px-7 py-5 flex flex-col rounded-lg gap-5" onSubmit={onSubmithandler}>
        <h2 className="font-medium text-2xl">{signstate}</h2>

        {signstate==='Sign Up'?<input type="text" placeholder="Username" required value={username}
            className="form-input px-3 py-2 rounded border outline-sky-500" onChange={(e)=>setUsername(e.target.value)} />
        :<></>}
        
        <input type="email" placeholder="Email" required className="form-input px-3
           py-2 rounded border outline-sky-500" onChange={(e)=>setEmail(e.target.value)} value={email} />

        <input type="password" placeholder="Password" required value={password}
          className="form-input px-3 py-2 rounded border outline-sky-500" onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit" className="p-2 bg-sky-500 text-white text-base rounded cursor-pointer">{signstate}</button>
        <div className="login-term flex gap-1 text-[12px] text-gray-500">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy</p>
        </div>
        <div className="login-forgot flex flex-col gap-1">

          {signstate==='Sign Up'?<p className="login-toggle text-[13px] text-[#5c5c5c]">Already have an account?
            <span onClick={()=>{setSignState('Sign In')}}
            className="font-medium text-sky-500 cursor-pointer">Click here</span>.</p>
          :
          <p className="login-toggle text-[13px] text-[#5c5c5c]">Don't have an account?
            <span onClick={()=>{setSignState('Sign Up')}}
            className="font-medium text-sky-500 cursor-pointer">Click here</span>.</p>}
          
        </div>
      </form>
    </div>
  )
}

export default Login
