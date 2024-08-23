import './css/leftsidebar.css'
import assets from "../assets/assets"
import { useNavigate } from 'react-router-dom'
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
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
  const [userR,setUserR] = useState<userdatatype | null>(null)
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
          setUserR(querySnap.docs[0].data() as userdatatype)
        }
        else{
          setUserR(null)
        }
      }
      else{
        setShowSearch(false)
      }  
      
    } catch (error) {
      console.error(error)
    }
  }

  const addfriend = async(userR:userdatatype)=>{
    try {
      let friendIDs:string[]=[]
      let friendUsernames:string[]=[]
          
      if(context?.userdata?.id){
        const friendsRef = doc(db,"friends",context.userdata.id)
        const docSnap = await getDoc(friendsRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        friendIDs = data.friendID || [];
        friendUsernames = data.friendUsername || [];
      }
      
      friendIDs.push(userR.id);
      friendUsernames.push(userR.name);

        await updateDoc(friendsRef,{
          friendID:friendIDs,
          friendUsername:friendUsernames
        })  
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
        {showSearch && userR
        ?<div onClick={()=>addfriend(userR)} className='friends add user flex items-center gap-2 px-5 py-2 text-sm cursor-pointer hover:bg-sky-500'>
          <img src={userR.avatar} alt="" className='max-w-none w-9 aspect-square rounded-full' />
          <p>{userR.name}</p>
        </div>
        :
        <></>
        }
        
      </div>
    </div>
  )
}

export default Leftsidebar
