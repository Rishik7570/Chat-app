import './css/chatbox.css'
import assets from "../assets/assets"
import { useContext, useEffect, useState } from 'react'
import { chats, Context, messages } from '../context/context'
import { arrayUnion, doc, getDoc, onSnapshot, Timestamp, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'


const Chatbox = () => {

  const context = useContext(Context)
  const [input,setInput] = useState('')

  const sendmsg = async()=>{
    try {
      if(input && context?.messagesID){
        await updateDoc(doc(db,'messages',context.messagesID),{
          messages:arrayUnion({
            sID:context.userdata?.id,
            text:input,
            createdAt:new Date()
          })
        })

        if(context.chatuser && context.userdata){
          const userIDs = [context.chatuser.rId,context.userdata.id]

          userIDs.forEach(async(id)=>{
          const userchatsRef = doc(db,'chats',id)
          const userchatSnap = await getDoc(userchatsRef)

          if(userchatSnap.exists()){
            const userchatdata = userchatSnap.data().chatsdata as chats[]
            const chatIndex = userchatdata.findIndex((c)=>c.messageID === context.messagesID)

            userchatdata[chatIndex].lastMessage = input.slice(0,30)
            userchatdata[chatIndex].updatedAt = Date.now()

            if(userchatdata[chatIndex].rId === context.userdata?.id){
              userchatdata[chatIndex].messageSeen = false
            }
            await updateDoc(userchatsRef,{
              chatsdata:userchatdata
            })
          }
        })
        }
        

        
      }
    } catch (error) {
      console.error(error)
    }
    setInput("")
  }

  const converttime = (timestamp:Timestamp)=>{
    const date = timestamp.toDate()
    const hour = date.getHours()
    const min = date.getMinutes()
    if(hour>12){
      return hour-12 + ":" + min + "PM"
    }
    else{
      return hour + ":" + min + "AM"
    }
  }

  useEffect(()=>{
    if(context?.messagesID){
      const unSub = onSnapshot(doc(db,'messages',context.messagesID),(res)=>{
        if(res.exists()){
          const data = res.data().messages as messages[]
          context.setMessages(data.reverse())
        }
      })
      return ()=>{
        unSub()
      }
    }
  },[context?.messagesID])

  return context?.chatuser? (
    <div className="chat-box h-[75vh] relative bg-[#f1f5ff]">
      {/* Top Bar */}

      <div className="chat-user px-4 py-2 gap-2 flex items-center border-b-[1px] border-b-[#c6c6c6]">
        <img src={context.chatuser.userData.avatar} alt="" className="w-7 rounded-full"/>
        <p className="flex-1 font-medium text-xl flex items-center gap-2">{context.chatuser.userData.name}
            <img src={assets.green_dot} alt="" className="dot"/></p>
        <img src={assets.help_icon} alt="" className="help w-7"/>
      </div>

      {/* Chat section */}

      <div className="chat-msg h-[calc(100%-70px)] pb-12 overflow-y-scroll flex flex-col-reverse">

        {context.messages.map((msg,index)=>(
          <div key={index}
            className={msg.sID === context.userdata?.id ?"s-msg flex items-end justify-end gap-1 px-4":
              "r-msg flex items-end gap-1 px-4 flex-row-reverse"}>

          <p className="msg bg-sky-500 p-2 max-w-[200px] text-sm font-light mb-7 text-white">
              {msg.text}</p>

          <div className="text-center text-[9px]">

            <img src={msg.sID === context.userdata?.id ? context.userdata.avatar : context.chatuser?.userData.avatar} 
              alt="" className="w-7 rounded-full aspect-square" />

            <p>{converttime(msg.createdAt)}</p>
          </div>
        </div>
        ))}

      </div>

      {/* Send Messages */}

      <div className="chat-input flex items-center gap-3 px-4 py-2 bg-white absolute bottom-0 left-0 right-0">
        <input type="text" onChange={(e)=>setInput(e.target.value)} value={input}
          placeholder="Send a message" className="flex-1 outline-none text-wrap" />
        <input type="file" id="image" accept="image/png, image/jpeg" hidden />
        <label htmlFor="image" className="flex">
          <img src={assets.gallery_icon} alt="" className="w-6 cursor-pointer" />
        </label>
        <img src={assets.send_button} onClick={sendmsg} alt="" className="w-7 cursor-pointer" />
      </div>
    </div>
  )
  :<div className='w-full flex flex-col items-center justify-center gap-1'>
    <img src={assets.logo_icon} alt="" className='w-14' />
    <p className='text-3xl font-medium text-gray-800'>Chat anytime, anywhere</p>
  </div>
}

export default Chatbox
