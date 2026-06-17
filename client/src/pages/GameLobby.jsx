import React, { useEffect, useContext,useState } from "react";
import UserContext from "../contexts/UserContext";
import { Routes, Route, Outlet, useNavigate } from 'react-router'
import { Row,Col,Container,Button,ListGroup } from "react-bootstrap";
function GameLobby(props){
    const [section,setSection] = useState("")
    const navigate = useNavigate()
    const user = useContext(UserContext)
    const [activeTab,setActiveTab] = useState("")
    useEffect(() => {
        if (!user || !user.username) {
            navigate("/login")
        }
    }, [user])
    const handlePages = (page) =>{
        setSection(page)
        navigate("/GameLobby/"+page)
    }
    return (
        <Container className="border-start border-end border-secondary min-vh-100">
            <Row><Col><h1>Game Lobby</h1></Col></Row>
            <Row>
                <Col sm={4}>
                    <ListGroup variant="flush">
                        <ListGroup.Item  active={section===""} onClick={()=>handlePages("")}>
                            Play
                        </ListGroup.Item>
                        <ListGroup.Item action active={section==="map"} onClick={()=>handlePages("map")}>Full Map</ListGroup.Item>
                        <ListGroup.Item action active={section==="leaderboard"} onClick={()=>handlePages("leaderboard")}>
                            Leaderboard
                        </ListGroup.Item>
                        <ListGroup.Item action active={section==="rules"} onClick={()=>handlePages("rules")}>Rules</ListGroup.Item>
                    </ListGroup>
                </Col >
                <Col sm={8}>
                <Outlet></Outlet>
                </Col>
            </Row>

        </Container>
    )
}

export default GameLobby