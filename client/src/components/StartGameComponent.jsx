import React from "react";
import { Row,Col,Container,Button } from "react-bootstrap";
import {useNavigate} from "react-router"
import { useState,useEffect } from "react";
function StartGameComponent(props){
    const navigate = useNavigate()
    return (
        <Container className="min-vh-100 d-flex flex-column align-items-center border border-2 rounded p-4 shadow-smr bg-light">
            <Button variant="danger" size="lg" onClick={()=>{
                navigate("../Game")
            }}> START GAME</Button>
        </Container>
    )
}
export default StartGameComponent