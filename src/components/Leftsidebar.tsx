import './css/leftsidebar.css'
import assets from "../assets/assets"


const Leftsidebar = () => {
  return (
    <div className="ls bg-[#001030] text-white h-[75vh]">
      <div className="ls-top p-5">
        <div className="ls-nav flex items-center justify-between">
          <img src={assets.logo} alt="" className="max-w-36" />
          <div className="menu relative py-2">
            <img src={assets.menu_icon} alt="" className="max-h-5 opacity-60 cursor-pointer" />
            <div className="sub-menu absolute top-full right-0 w-32 bg-white text-black p-5 rounded hidden">
              <p className='cursor-pointer text-sm'>Edit Profile</p>
              <hr className='line bg-[#a4a4a4] my-2 h-[1px]'/>
              <p className='cursor-pointer text-sm'>Logout</p>
            </div>
          </div>
        </div>
        <div className="ls-search bg-[#002760] flex items-center gap-3 px-3 py-2 mt-5">
          <img src={assets.search_icon} alt="" className="w-4" />
          <input type="text" placeholder="Search here" className="bg-transparent text-[11px] outline-none placeholder:text-white" />
        </div>
      </div>
      <div className="ls-list flex flex-col h-[70%] overflow-y-scroll">
        {Array(12).fill('').map((item,index)=>(
          <div key={index} className="friends flex items-center gap-2 px-5 py-2 text-sm cursor-pointer hover:bg-sky-500">
          <img src={assets.profile_img} alt="" className="max-w-none w-9 aspect-square rounded-full" />
          <div className="flex flex-col">
            <p className="">Abhisek Sarkar</p>
            <span className="text-[#9f9f9f] text-[11px]">What's up niggs?</span>
          </div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default Leftsidebar
