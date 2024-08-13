import { useState } from 'react'
import assets from '../assets/assets'
import './css/profile.css'

const Profile = () => {

  const [image,setImage] = useState<File | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0])
    }
  }

  return (
    <div className='profile min-h-[100vh] flex items-center justify-center'>
      <div className="profile-container bg-white flex items-center justify-between min-w-[700px] rounded-xl">
        <form className='flex flex-col gap-5 p-10'>
          <p className='font-medium text-xl'>Profile Details</p>
          <label htmlFor="avatar" className='flex items-center gap-2 text-gray-500 cursor-pointer'>
            <input type="file" id="avatar" accept='.png, .jpg, .jpeg' hidden onChange={handleImageChange}/>
            <img src={image? URL.createObjectURL(image):assets.avatar_icon} alt="" className="w-12 aspect-square rounded-full" />
            Upload Profile Image
          </label>
          <input type="text" placeholder='Your Name' required className='p-1 min-w-80 border
             border-[#c9c9c9] outline-sky-500'/>
          <textarea placeholder='Write profile bio' required className='p-2 min-w-80 border
             border-[#c9c9c9] outline-sky-500'></textarea>
          <button type="submit" className='text-white bg-sky-500 p-2 text-base cursor-pointer'>Save</button>
        </form>
        <img src={image?URL.createObjectURL(image):assets.logo_icon} alt=""
           className='max-w-40 aspect-square my-5 mx-auto rounded-full'/>
      </div>
    </div>
  )
}

export default Profile
