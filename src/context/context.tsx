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


type contextproviderprops = {
    children:ReactNode
}
interface appcontext {
    loadUserdata: (uid: string) => Promise<void>
    userdata:userdatatype|undefined
    setUserdata: React.Dispatch<React.SetStateAction<userdatatype | undefined>>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    chatdata: any[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setChatdata: React.Dispatch<React.SetStateAction<any[]>>
}



export const Context = createContext<appcontext | null>(null)

const ContextProvider = (props:contextproviderprops)=>{

    const navigate = useNavigate()

    const [userdata,setUserdata] = useState<userdatatype>()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [chatdata,setChatdata] = useState<any[]>([])


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
                if(res.exists()){
                    const chatitem = res.data().chatData
                    const tempitem = []
                    for(const item of chatitem){
                        const userRef = doc(db,"users",item.rID)
                        const userSnap = await getDoc(userRef)
                        const userData = userSnap.data()
                        tempitem.push({...item,userData})
                    }
                    setChatdata(tempitem.sort((a,b)=>b.updatedAt - a.updatedAt))
                }
            })
            return ()=>{
                unSub()
            }
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