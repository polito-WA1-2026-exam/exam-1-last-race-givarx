import React, { useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router";
function GameLobby(props){
    const navigate = useNavigate()
    const user = useContext(UserContext)

    useEffect(() => {
        if (!user || !user.username) {
            navigate("/login")
        }
    }, [user, navigate])

    if (!user || !user.username) {
        return null
    }

    return (
        <div>
            <h1>Game Lobby</h1>
            <p>Benvenuto in lobby, {user.username}.</p>
        </div>
    )
}

export default GameLobby