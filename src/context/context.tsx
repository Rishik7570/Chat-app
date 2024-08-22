import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createContext, ReactNode, useState } from "react";
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




type contextproviderprops = {
    children:ReactNode
}
interface appcontext {
    loadUserdata: (uid: string) => Promise<void>
    userdata:userdatatype|undefined
    setUserdata: React.Dispatch<React.SetStateAction<userdatatype | undefined>>
    msg: string
    setmsg: React.Dispatch<React.SetStateAction<string>>
}



export const Context = createContext<appcontext | null>(null)

const ContextProvider = (props:contextproviderprops)=>{

    const navigate = useNavigate()

    const [userdata,setUserdata] = useState<userdatatype>()
    const [msg,setmsg] = useState("")


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

    

    const value:appcontext = {
        userdata,setUserdata,
        loadUserdata,
        msg,setmsg
    }

    return(
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider