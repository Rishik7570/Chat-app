import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";


type userdatatype = {
    avatar:string,
    bio:string,
    email:string,
    id:string,
    lastseen:number,
    name:string,
    username:string
}

type chatdatatype = {
    chatData?:string
}


type contextproviderprops = {
    children:ReactNode
}
interface appcontext {
    loadUserdata: (uid: string) => Promise<void>
    userdata:userdatatype|undefined
    setUserdata: React.Dispatch<React.SetStateAction<userdatatype | undefined>>
}



export const Context = createContext<appcontext | null>(null)

const ContextProvider = (props:contextproviderprops)=>{

    const navigate = useNavigate()

    const [userdata,setUserdata] = useState<userdatatype>()
    const [chatdata,setChatdata] = useState([])


    const loadUserdata = async(uid:string)=>{
        try {
            const userRef = doc(db,'users',uid)
            const userSnap = await getDoc(userRef)
            const data = userSnap.data() as userdatatype
            setUserdata(data)

            if(userdata?.avatar && userdata.name){
                navigate('/chat')
            }
            else{
                navigate('/profile')
            }
            
            await updateDoc(userRef,{
                lastseen:Date.now()
            })
            setInterval(async()=>{
                if(auth){
                    await updateDoc(userRef,{
                        lastseen:Date.now()
                    })  
                }
            },60000)    
        } 
        catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(userdata){
            const chatRef = doc(db,"chats",userdata.id)
            const unSub = onSnapshot(chatRef,async(res)=>{
                const data = res.data() as chatdatatype
            })
        }
    },[userdata])
    

    const value:appcontext = {
        userdata,setUserdata,
        chatdata,setChatdata,
        loadUserdata
    }

    return(
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider