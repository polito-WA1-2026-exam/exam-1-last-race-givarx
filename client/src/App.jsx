import { Routes, Route, Outlet, useNavigate } from 'react-router'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import GameLobby from './pages/GameLobby'
import Map from './components/Map'
import LeaderBoard from './components/Leaderboard'
import 'bootstrap/dist/css/bootstrap.min.css'
import UserContext from "./contexts/UserContext";
import { useState } from 'react'
import NavHead from './components/NavHead';
import { LoginUser,LogoutUser } from './api/auth-api'
function App() {
  const navigate = useNavigate()
  const [user,setUser] = useState({username:undefined})
  const [LogInInfo,setLogInInfo] = useState(null)
  const handleLogin = async (credentials)=>{
    const response = await LoginUser(credentials.username,credentials.password)
    if(!response.error)
    {
      setUser({username:response.username})
      navigate("/")
    }
    else{
      console.log("login failed")
    }
  }
  const handleLogout= async ()=>{
    const res = await LogoutUser()
    if(res)
    {
      //logout success
      setUser({username:undefined})
      navigate("/")
    }
    else{
      console.log("internal server error")
    }
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
          <Route path="GameLobby" element={<GameLobby />} >
          <Route index element={<h1> this is the index element</h1>}></Route>
          <Route path="map" element={<Map />}></Route>
          <Route path="leaderboard" element={<LeaderBoard></LeaderBoard>} username={user.username}></Route>
          </Route>
        </Route>
    </Routes>
    </UserContext.Provider>
  )
}
export default App
