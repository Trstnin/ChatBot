import Headers from "./components/Headers.jsx";
import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";


function App() {

  return (
  <main>
     <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<NotFound />} />
        
      </Routes>
  </main>
)
}

export default App;
