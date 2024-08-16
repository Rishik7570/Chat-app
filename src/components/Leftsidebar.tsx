import './css/leftsidebar.css'
import assets from "../assets/assets"
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db, logout } from '../config/firebase'
import { useContext, useState } from 'react'
import { Context } from '../context/context'

type userdatatype = {
  avatar:string,
  bio:string,
  email:string,
  id:string,
  lastseen:number,
  name:string,
  username:string
}


const Leftsidebar = () => {

  const navigate = useNavigate()
  const context = useContext(Context)
  const [user,setUser] = useState<userdatatype | null>(null)
  const [showSearch,setShowSearch] = useState(false)

  const inputHandler = async(e:React.ChangeEvent<HTMLInputElement>)=>{
    try {
      const input = e.target.value
      if(input){
        setShowSearch(true)
        const userRef = collection(db,"users")
        const q = query(userRef,where("username","==",input.toLowerCase()))
        const querySnap = await getDocs(q)
        if(!querySnap.empty && querySnap.docs[0].data().id !== context?.userdata?.id){
          console.log(querySnap.docs[0].data());
          setUser(querySnap.docs[0].data() as userdatatype)
        }
        else{
          setUser(null)
        }
      }
      else{
        setShowSearch(false)
      }
      
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="ls bg-[#001030] text-white h-[75vh]">
      <div className="ls-top p-5">
        <div className="ls-nav flex items-center justify-between">
          <img src={assets.logo} alt="" className="max-w-36" />
          <div className="menu relative py-2">
            <img src={assets.menu_icon} alt="" className="max-h-5 opacity-60 cursor-pointer" />
            <div className="sub-menu absolute top-full right-0 w-32 bg-white text-black p-5 rounded hidden">
              <p className='cursor-pointer text-sm' onClick={()=>navigate('/profile')}>Edit Profile</p>
              <hr className='line bg-[#a4a4a4] my-2 h-[1px]'/>
              <p className='cursor-pointer text-sm' onClick={()=>logout()}>Logout</p>
            </div>
          </div>
        </div>
        <div className="ls-search bg-[#002760] flex items-center gap-3 px-3 py-2 mt-5">
          <img src={assets.search_icon} alt="" className="w-4" />
          <input type="text" placeholder="Search here" onChange={inputHandler}
            className="bg-transparent text-[11px] outline-none placeholder:text-white" />
        </div>
      </div>
      <div className="ls-list flex flex-col h-[70%] overflow-y-scroll">
        {showSearch && user
        ?<div className='friends add user flex items-center gap-2 px-5 py-2 text-sm cursor-pointer hover:bg-sky-500'>
          <img src={user.avatar} alt="" className='max-w-none w-9 aspect-square rounded-full' />
          <p>{user.name}</p>
        </div>
        :
        Array(12).fill('').map((item,index)=>(
          <div key={index} className="friends flex items-center gap-2 px-5 py-2 text-sm cursor-pointer hover:bg-sky-500">
          <img src={assets.profile_img} alt="" className="max-w-none w-9 aspect-square rounded-full" />
          <div className="flex flex-col">
            <p className="">Abhisek Sarkar</p>
            <span className="text-[#9f9f9f] text-[11px]">What's up niggs?</span>
          </div>
        </div>
        ))
        }
        
      </div>
    </div>
  )
}

export default Leftsidebar
