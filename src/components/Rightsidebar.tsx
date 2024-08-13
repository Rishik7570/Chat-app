import assets from '../assets/assets'
import './css/rightsidebar.css'

const Rightsidebar = () => {
  return (
    <div className='rs text-white relative bg-[#001030] h-[75vh] overflow-y-scroll'>
      <div className="rs-profile pt-14 flex flex-col items-center justify-center">
        <img src={assets.profile_img} alt="" className='w-[110px] max-w-none rounded-full aspect-square' />
        <p className="flex items-center justify-center gap-1 py-1 text-[18px] font-normal">Abhisek Sarkar 
          <img src={assets.green_dot} alt="" className='dot' /></p>
        <p className="max-w-[70%] text-center text-[12px] opacity-80 font-light">
          Hey there, I am Mama. I am using Chatapp for picking up girls.</p>
      </div>
      <hr className='border-white opacity-50 my-4'/>
      <div className="rs-media px-5 text-xs">
        <p>Media</p>
        <div className="images max-h-44 overflow-y-scroll mt-2 gap-1 grid">
          <img src={assets.pic1} alt="" className="w-14 rounded-md cursor-pointer" />
          <img src={assets.pic2} alt="" className="w-14 rounded-md cursor-pointer" />
          <img src={assets.pic3} alt="" className="w-14 rounded-md cursor-pointer" />
          <img src={assets.pic4} alt="" className="w-14 rounded-md cursor-pointer" />
          <img src={assets.pic1} alt="" className="w-14 rounded-md cursor-pointer" />
          <img src={assets.pic2} alt="" className="w-14 rounded-md cursor-pointer" />
        </div>
      </div>
      <button className="absolute bottom-0 left-[50%] translate-x-[-50%] bg-sky-500
         text-white text-[12px] font-light px-14 py-2 rounded-3xl cursor-pointer mb-3">Logout
      </button>
    </div>
  )
}

export default Rightsidebar
