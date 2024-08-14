import { doc, getDoc } from "firebase/firestore";
import { createContext, ReactNode, useState } from "react";
import { db } from "../config/firebase";

type contextproviderprops = {
    children:ReactNode
}
type appcontext = {
    loadUserdata: (uid: string) => Promise<void>
}


export const Context = createContext<appcontext | null>(null)

const ContextProvider = (props:contextproviderprops)=>{

    const [userdata,setUserdata] = useState()
    const [chatdata,setChatdata] = useState()

    const loadUserdata = async(uid:string)=>{
        try {
            const userRef = doc(db,'users',uid)
            const userSnap = await getDoc(userRef)
            console.log(userSnap);
            
        } catch (error) {
            
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