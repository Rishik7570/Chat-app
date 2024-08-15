import { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import "./css/profile.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import upload from "../lib/upload";
import { Context } from "../context/context";

type userdatatype = {
  avatar:string,
  bio:string,
  email:string,
  id:string,
  lastseen:number,
  name:string,
  username:string
}


const Profile = () => {
  
  const navigate = useNavigate()
  const context = useContext(Context)

  const [image, setImage] = useState<File>();
  const [previmg,setPrevimg] = useState("")
  const [name, setname] = useState("");
  const [bio, setbio] = useState("");
  const [uid, setuid] = useState("");

  const profileupdate = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    try {
      if(!previmg && !image){
        toast.error("Upload Profile Picture")
      }
      const docRef = doc(db,"users",uid)
      if(image){
        const imgURL = await upload(image)
        setPrevimg(imgURL)
        await updateDoc(docRef,{
          avatar:imgURL,
          bio:bio,
          name:name
        })
      }
      else{
        await updateDoc(docRef,{
          bio:bio,
          name:name
        })
      }
      const snap = await getDoc(docRef)
      const data = snap.data() as userdatatype
      context?.setUserdata(data)
      navigate('/chat')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    onAuthStateChanged(auth, async(user)=>{
      if (user) {
        setuid(user.uid);
        const docRef = doc(db,"users",user.uid)
        const docSnap = await getDoc(docRef)
        const data = docSnap.data() as userdatatype
        if(data.name){
          setname(data.name)
        }
        if(data.bio){
          setbio(data.bio)
        }
        if(data.avatar){
          setPrevimg(data.avatar)
        }
      }
      else{
        navigate('/')
      }   
    })
  },[])

  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="profile min-h-[100vh] flex items-center justify-center">
      <div className="profile-container bg-white flex items-center justify-between min-w-[700px] rounded-xl">
        <form className="flex flex-col gap-5 p-10" onSubmit={profileupdate}>
          <p className="font-medium text-xl">Profile Details</p>
          <label
            htmlFor="avatar"
            className="flex items-center gap-2 text-gray-500 cursor-pointer"
          >
            <input
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
              onChange={handleImageChange}
            />
            <img
              src={image ? URL.createObjectURL(image) : assets.avatar_icon}
              alt=""
              className="w-12 aspect-square rounded-full"
            />
            Upload Profile Image
          </label>
          <input
            type="text"
            placeholder="Your Name"
            required
            className="p-1 min-w-80 border
             border-[#c9c9c9] outline-sky-500"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />

          <textarea
            placeholder="Write profile bio"
            required
            className="p-2 min-w-80 border
             border-[#c9c9c9] outline-sky-500"
            value={bio}
            onChange={(e) => setbio(e.target.value)}
          ></textarea>

          <button
            type="submit"
            className="text-white bg-sky-500 p-2 text-base cursor-pointer"
          >
            Save
          </button>
        </form>
        <img
          src={image ? URL.createObjectURL(image) : previmg?previmg : assets.logo_icon}
          alt=""
          className="max-w-40 aspect-square my-5 mx-auto rounded-full"
        />
      </div>
    </div>
  );
};

export default Profile;
