import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Chat from "./pages/Chat"
import Profile from "./pages/Profile"


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App
