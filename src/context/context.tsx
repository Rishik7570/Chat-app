import { doc, getDoc } from "firebase/firestore";
import { createContext, ReactNode, useState } from "react";
import { db } from "../config/firebase";
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
type appcontext = {
    loadUserdata: (uid: string) => Promise<void>
}



export const Context = createContext<appcontext | null>(null)

const ContextProvider = (props:contextproviderprops)=>{

    const navigate = useNavigate()

    const [userdata,setUserdata] = useState<userdatatype>()
    const [chatdata,setChatdata] = useState()


    const loadUserdata = async(uid:string)=>{
        try {
            const userRef = doc(db,'users',uid)
            const userSnap = await getDoc(userRef)

            if(userSnap.exists()){
                const data = userSnap.data() as userdatatype
                console.log(data);
                
                setUserdata(data)
            }  
            console.log(userdata);    
               
        } catch (error) {
            console.log(error);
            
        }
    }

    const value = {
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