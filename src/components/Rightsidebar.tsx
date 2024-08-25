import { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { logout } from '../config/firebase'
import './css/rightsidebar.css'
import { Context } from '../context/context'




const Rightsidebar = () => {

  const context = useContext(Context)
  const [msgimg,setMsgimg] = useState<string[]>([])

  useEffect(()=>{
    let temp:string[] = []
    context?.messages.map((msg)=>{
      if(msg.image){
        temp.push(msg.image)
      }
    })
    setMsgimg(temp);
    
  },[context?.messages])

  return context?.chatuser?(
    <div className='rs text-white relative bg-[#001030] h-[75vh] overflow-y-scroll'>
      <div className="rs-profile pt-14 flex flex-col items-center justify-center">
        <img src={context.chatuser.userData.avatar} alt="" className='w-[110px] max-w-none rounded-full aspect-square' />
        <p className="flex items-center justify-center gap-1 py-1 text-[18px] font-normal">{context.chatuser.userData.name} 
          {Date.now()-context.chatuser.userData.lastseen <= 70000 ?<img src={assets.green_dot} alt="" className='dot' />:null}</p>
        <p className="max-w-[70%] text-center text-[12px] opacity-80 font-light">
          {context.chatuser.userData.bio}</p>
      </div>
      <hr className='border-white opacity-50 my-4'/>
      <div className="rs-media px-5 text-xs">
        <p>Media</p>

        <div className="images max-h-44 overflow-y-scroll mt-2 gap-1 grid">
            {msgimg.map((url,index)=>(
              <img src={url} key={index} className='w-14 rounded-md cursor-pointer' onClick={()=>window.open(url)} />))}
        </div>

      </div>
      <button onClick={()=>logout()} className="absolute bottom-0 left-[50%] translate-x-[-50%] bg-sky-500
         text-white text-[12px] font-light px-14 py-2 rounded-3xl cursor-pointer mb-3">Logout
      </button>
    </div>
  )
  :
  (
    <div className='rs text-white relative bg-[#001030] h-[75vh] overflow-y-scroll'>
      <button onClick={()=>logout()} className="absolute bottom-0 left-[50%] translate-x-[-50%] bg-sky-500
         text-white text-[12px] font-light px-14 py-2 rounded-3xl cursor-pointer mb-3">Logout
      </button>
    </div>
  )
}

export default Rightsidebar
