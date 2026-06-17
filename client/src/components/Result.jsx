import React, { use, useContext, useEffect, useState } from "react";
import LinkContext from "../contexts/LinkContext";
import UserContext from "../contexts/UserContext";
import { GetRandomEvents,PostScore } from "../api/game-api";
import {Row,Col,Table,Button} from "react-bootstrap"
import {useNavigate} from "react-router"
import { Link,VerifyPath } from "../models/Stations";
import ErrorIcon from "./ErrorIcon";
import Map from "./Map"
import Leaderboard from "./Leaderboard"
function Result(props){
    const navigate = useNavigate()
    const user = useContext(UserContext)
    const [events,setEvents] = useState([])
    const selectedLinks = useContext(LinkContext)
    const [result,setResult] = useState(0)
    const [result_message,setResultMessage] = useState("not-valid")
    const [resultMap,setResultMap] = useState(null)
    const [statusEvents,setStatusEvents] = useState(false)
    const UploadResult = async ()=>{
        const res = await PostScore(user.username,result)
        if(res.error){
            console.log("failed uploading result" )
        }
    }
    const Events = async ()=>{
        const result = await GetRandomEvents(selectedLinks.length)
        if(!result.error){
          setEvents(result)
          setStatusEvents(true)
        }
    }
    const mapResult = (res)=>{
        if (!res?.length) return null
        return res.map((entry, index)=>{
            return (
                <tr key={index}>
                    <td>{entry[0].from}</td>
                    <td>{entry[0].to}</td>
                    <td>{entry[1].name}</td>
                    <td>{entry[1].buff}</td>
                </tr>
            )
        })
    }
    useEffect( ()=>{
        const randomStations = props.randomStations
        Events()
        console.log("io sto qua"+events.length)

        if(events.length>0 && statusEvents===true){
            const links = selectedLinks.map((value)=>{
                    let ls = value.split("-");
                    return new Link(ls[0],ls[1]);
                })
            console.log(links)
                if (!VerifyPath(randomStations.from.name,randomStations.to.name,links)) {
                console.log("not valid path")
                return
            }
            console.log("so passato")
            setResultMessage("valid-path")
            const map = []
            let sum = 20
            for (let i = 0; i < events.length; i++) {
                map.push([links[i], events[i]]) 
                sum += events[i].buff
            }
            setResult(sum)
            setResultMap(mapResult(map))
            console.log(map)
        }
    },[statusEvents])
    useEffect(()=>{
        if(resultMap){

        }
    },[result])
    return <>
        <Row><Col><h1>Result: {result}</h1></Col></Row>
        {result_message!="not-valid" &&
        <Table striped bordered hover variant="primary" data-bs-theme="dark">
            <thead>
                <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Event</th>
                    <th>Buff</th>
                </tr>
            </thead>
            <tbody>
                {resultMap}
            </tbody>
        </Table>
        }
        {result_message==="not-valid" && <ErrorIcon variant="danger" message="PATH NOT VALID" canBeClosed="no"/>}
        <Button variant="success" size="lg" onClick={()=>{UploadResult(); navigate("/GameLobby")}}>Go Back to the Game Lobby</Button>
        <Map></Map>
        <Leaderboard></Leaderboard>
    </>
}

export default Result

