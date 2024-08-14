import { Route, Routes, useNavigate } from "react-router-dom"
import Login from "./pages/Login"
import Chat from "./pages/Chat"
import Profile from "./pages/Profile"
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { Context } from "./context/context";


const App = () => {

  const navigate = useNavigate()
  const context = useContext(Context)

  useEffect(()=>{
    onAuthStateChanged(auth,async(user)=>{
      if (user){
        navigate('/chat')
        await context?.loadUserdata(user.uid) 
      }
      else{
        navigate('/')
      }
    })
  },[navigate])

  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App
