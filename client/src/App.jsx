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
import Game from './pages/Game'
import GameForm from './components/GameForm'
import StartGameComponent from './components/StartGameComponent'
import LinkContext from "./contexts/LinkContext"
import Result from './components/Result'
function App() {
  const navigate = useNavigate()
  const [user,setUser] = useState({username:undefined})
  const [LogInInfo,setLogInInfo] = useState(null)
  const [selectedLinks,setSelectedLinks] = useState([])
  const [randomStations,setRandomStations] = useState([])
  const handleLogin = async (credentials)=>{
    const response = await LoginUser(credentials.username,credentials.password)
    if(!response.error)
    {
      setUser({username:response.username})
      navigate("/")
      return true
    }
    else{
      console.log("login failed")
      return false
    }
  }
  const handleLogout= async ()=>{
    const res = await LogoutUser()
    if(res)
    {
      //logout success
      setUser({username:undefined})
      navigate("/")
      return true
    }
    else{
      return false
    }
  }
  return (
    <LinkContext.Provider value={selectedLinks}>
    <UserContext.Provider value={user}>
      <Routes>
        <Route path="/" element={<NavHead  doLogout={handleLogout} />}>
          <Route index element={<HomePage></HomePage>}></Route>
          <Route path="login" element={<LoginPage doLogin={handleLogin}/>} />
          <Route path="GameLobby" element={<GameLobby />} >
          <Route index element={<StartGameComponent ></StartGameComponent>}></Route>
          <Route path="map" element={<Map />}></Route>
          <Route path="leaderboard" element={<LeaderBoard></LeaderBoard>} username={user.username}></Route>
          </Route>
        </Route>
        
        <Route path="/Game" element={<Game></Game>}>
          
          <Route index element={<GameForm selectLinks={setSelectedLinks} randomStations={{randomStations, setRandomStations}}></GameForm>}></Route>
          <Route path="result" element={<Result randomStations={randomStations}/>}></Route>
        </Route>
    </Routes>
    </UserContext.Provider>
    </LinkContext.Provider>
  )
}
export default App
