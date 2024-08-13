import Chatbox from '../components/Chatbox'
import Leftsidebar from '../components/Leftsidebar'
import Rightsidebar from '../components/Rightsidebar'
import './css/chat.css'

const Chat = () => {
  return (
    <div className='chat min-h-[100vh] grid place-items-center'>
      <div className="chat-container w-[95%] h-[75vh] max-w-[1000px] bg-[aliceblue] grid">
        <Leftsidebar />
        <Chatbox />
        <Rightsidebar />
      </div>
    </div>
  )
}

export default Chat
