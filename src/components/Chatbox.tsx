import './css/chatbox.css'
import assets from "../assets/assets"
import { useContext, useState } from 'react'
import { Context } from '../context/context'


const Chatbox = () => {

  const context = useContext(Context)
  const [input,setInput] = useState('')

  return context?.chatuser? (
    <div className="chat-box h-[75vh] relative bg-[#f1f5ff]">
      {/* Top Bar */}

      <div className="chat-user px-4 py-2 gap-2 flex items-center border-b-[1px] border-b-[#c6c6c6]">
        <img src={assets.profile_img} alt="" className="w-7 rounded-full"/>
        <p className="flex-1 font-medium text-xl flex items-center gap-2">Abhisek Sarkar 
            <img src={assets.green_dot} alt="" className="dot"/></p>
        <img src={assets.help_icon} alt="" className="help w-7"/>
      </div>

      {/* Chat section */}

      <div className="chat-msg h-[calc(100%-70px)] pb-12 overflow-y-scroll flex flex-col-reverse">
        <div className="s-msg flex items-end justify-end gap-1 px-4">
          <p className="msg bg-sky-500 p-2 max-w-[200px] text-sm font-light mb-7 text-white">
            Sender Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <div className="text-center text-[9px]">
            <img src={assets.profile_img} alt="" className="w-7 rounded-full aspect-square" />
            <p>1:27 AM</p>
          </div>
        </div>
        <div className="s-msg flex items-end justify-end gap-1 px-4">
          <img src={assets.pic1} alt="" className='max-w-56 mb-7 rounded-lg' />
          <div className="text-center text-[9px]">
            <img src={assets.profile_img} alt="" className="w-7 rounded-full aspect-square" />
            <p>1:27 AM</p>
          </div>
        </div>
        <div className="r-msg flex items-end gap-1 px-4 flex-row-reverse">
          <p className="msg bg-sky-500 p-2 max-w-[200px] text-sm font-light mb-7 text-white">
            Receiver Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <div className="text-center text-[9px]">
            <img src={assets.profile_img} alt="" className="w-7 rounded-full aspect-square" />
            <p>1:27 AM</p>
          </div>
        </div>
      </div>

      {/* Send Messages */}

      <div className="chat-input flex items-center gap-3 px-4 py-2 bg-white absolute bottom-0 left-0 right-0">
        <input type="text" placeholder="Send a message" className="flex-1 outline-none text-wrap" />
        <input type="file" id="image" accept="image/png, image/jpeg" hidden />
        <label htmlFor="image" className="flex">
          <img src={assets.gallery_icon} alt="" className="w-6 cursor-pointer" />
        </label>
        <img src={assets.send_button} alt="" className="w-7 cursor-pointer" />
      </div>
    </div>
  )
  :<div className=''>
    <img src={assets.logo_icon} alt="" className='' />
    <p>Chat anytime, anywhere</p>
  </div>
}

export default Chatbox
