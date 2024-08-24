import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";

type userdatatype = {
  avatar: string;
  bio: string;
  email: string;
  id: string;
  lastseen: number;
  name: string;
  username: string;
};

export type chats = {
  messageID:string
  lastMessage:string
  rId:string
  updatedAt:number
  messageSeen:boolean
}

export type chatWithUserData = chats & {
  userData: userdatatype;
};

export type messages = {
  sID:string
  text:string
  createdAt: Date
}


type contextproviderprops = {
  children: ReactNode;
};
interface appcontext {
  loadUserdata: (uid: string) => Promise<void>;
  userdata: userdatatype | undefined;
  setUserdata: React.Dispatch<React.SetStateAction<userdatatype | undefined>>;
  chatdata: chatWithUserData[];
  setchatdata: React.Dispatch<React.SetStateAction<chatWithUserData[]>>;
  messagesID: string
  setMessagesID: React.Dispatch<React.SetStateAction<string>>
  messages: messages[]
  setMessages: React.Dispatch<React.SetStateAction<messages[]>>
  chatuser: chatWithUserData | undefined
  setChatuser: React.Dispatch<React.SetStateAction<chatWithUserData | undefined>>
}

export const Context = createContext<appcontext | null>(null);

const ContextProvider = (props: contextproviderprops) => {
  const navigate = useNavigate();

  const [userdata, setUserdata] = useState<userdatatype>();
  const [chatdata, setchatdata] = useState<chatWithUserData[]>([]);
  const [messagesID,setMessagesID] = useState('')
  const [messages,setMessages] = useState<messages[]>([])
  const [chatuser,setChatuser] = useState<chatWithUserData>()

  const loadUserdata = async (uid: string) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      const data = userSnap.data() as userdatatype;
      setUserdata(data);

      if (userdata?.avatar && userdata.name) {
        navigate("/chat");
      } else {
        navigate("/profile");
      }

      await updateDoc(userRef, {
        lastseen: Date.now(),
      });
      setInterval(async () => {
        if (auth) {
          await updateDoc(userRef, {
            lastseen: Date.now(),
          });
        }
      }, 60000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userdata) {
      const chatref = doc(db, "chats", userdata.id);
      const unSub = onSnapshot(chatref, async (res) => {
        if (res.exists()) {
          const chatitem = res.data().chatsdata as chats[];
          const tempitem:chatWithUserData[] = [];
          for (const item of chatitem) {
            const userRef = doc(db, "users", item.rId);
            const usersnap = await getDoc(userRef);
            const userData = usersnap.data() as userdatatype;
            
            tempitem.push({ ...item, userData });
          }
          setchatdata(tempitem.sort((a, b) => b.updatedAt - a.updatedAt));
        }
      });
      return () => {
        unSub();
      };
    }
  }, [userdata]);

  const value: appcontext = {
    userdata,setUserdata,
    loadUserdata,
    chatdata,setchatdata,
    messages,setMessages,
    messagesID,setMessagesID,
    chatuser,setChatuser
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default ContextProvider;
