import { useContext, useEffect, useState } from "react";
import Chatbox from "../components/Chatbox";
import Leftsidebar from "../components/Leftsidebar";
import Rightsidebar from "../components/Rightsidebar";
import "./css/chat.css";
import { Context } from "../context/context";

const Chat = () => {
  const context = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (context?.chatdata && context.userdata) {
      setLoading(false);
    }
  }, [context?.chatdata, context?.userdata]);

  return (
    <div className="chat min-h-[100vh] grid place-items-center">
      {loading ? (
        <p className="text-5xl text-white">Loading...</p>
      ) : (
        <div className="chat-container w-[95%] h-[75vh] max-w-[1000px] bg-[aliceblue] grid">
          <Leftsidebar />
          <Chatbox />
          <Rightsidebar />
        </div>
      )}
    </div>
  );
};

export default Chat;
