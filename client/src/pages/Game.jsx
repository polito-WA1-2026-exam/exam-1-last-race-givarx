import React from "react";
import {Row,Col,Container,Form,Button,ProgressBar} from "react-bootstrap"
import { useContext,useState,useEffect } from "react";
import UserContext from "../contexts/UserContext";
import {useNavigate,Outlet} from "react-router"
import { DUMP_LINK_LIST,DUMP_STATION_LIST } from "../models/Stations";
import { Links } from "react-router";
function Game(props){
    const navigate = useNavigate()
    const user = useContext(UserContext)
    

    //login side effect
    useEffect(()=>{
        if(!user.username){
            navigate("/login")
        }
    })
    //reset selectedLInks
    useEffect(()=>{
        props.setSelectedLinks([])
    },[])
    return (
        <Container className="min-vh-100 d-flex flex-column align-items-center border border-2 rounded p-4 shadow-smr bg-light">
            
            <Outlet ></Outlet>
        </Container>
    )
}
export default Game