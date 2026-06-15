import React from "react";
import {Row,Col,Container,Form,Button} from "react-bootstrap"
import { useContext,useState,useEffect } from "react";
import UserContext from "../contexts/UserContext";
import {useNavigate,Outlet} from "react-router"
import { DUMP_LINK_LIST,DUMP_STATION_LIST } from "../models/Stations";
import { Links } from "react-router";
function Game(props){
    const navigate = useNavigate()
    const user = useContext(UserContext)
    const [GameState,setGameState] = useState("ingame")
    const [selectedLinks,setSelectedLinks] = useState([])
    useEffect(()=>{
        if(!user.username){
            navigate("/login")
        }
        else if(GameState === "ingame"){
            //carica la pagina
        }
        else if(GameState === "result"){
            //posta i risultati e passali alla pagina dei risultati, che si occupera di fare la post nel server
        }
    },[])
    return (
        <Container className="min-vh-100 d-flex flex-column align-items-center border border-2 rounded p-4 shadow-smr bg-light">
            <Outlet context={{selectedLinks,setSelectedLinks}}></Outlet>
        </Container>
    )
}
export default Game