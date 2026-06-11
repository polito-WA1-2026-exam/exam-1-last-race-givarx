import { Routes, Route, Outlet, useNavigate } from 'react-router'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import GameLobby from './pages/GameLobby'
import 'bootstrap/dist/css/bootstrap.min.css'
import UserContext from "./contexts/UserContext";
import { useState } from 'react'
import NavHead from './components/NavHead';
function App() {
  const navigate = useNavigate()
  const [user,setUser] = useState({username:undefined})

  const handleLogin = (credentials)=>{
    let name = "dummyuser"
    let pass = "dummy123"
    //make the api call remember
    if(credentials.username === name && pass == credentials.password)
    {
      setUser({username:"dummyuser"})
      navigate("/")
    }
    else{
      console.log("login failed")
    }
  }
  const handleLogout= ()=>{
    setUser({username:undefined})
  }
  return (
    <UserContext.Provider value={user}>
      <Routes>
        <Route path="/" element={<>
        <NavHead  doLogout={handleLogout} />
        <Outlet></Outlet>
        </>}>
          <Route index element={<HomePage></HomePage>}></Route>
          <Route path="login" element={<LoginPage doLogin={handleLogin}/>} />
          <Route path="GameLobby" element={<GameLobby />} />
        </Route>
    </Routes>
    </UserContext.Provider>
  )
}
export default App
