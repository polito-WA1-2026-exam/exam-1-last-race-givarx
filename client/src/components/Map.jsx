import React from "react";
import { Container,Row,Col,ListGroup,ListGroupItem,Image } from "react-bootstrap";
import { useState,useContext,useEffect } from "react";
import { DUMP_STATION_LIST,DUMP_LINK_LIST,Station,Link } from "../models/Stations";
import { GetStations } from "../api/game-api.js";
import FullMapImg from "../assets/full_map.png"; 
function Map(props){
    const [StationList,SetStations] = useState(undefined)
    const [err,setErr] = useState(null)
    
    
    useEffect(()=>{
    async function fetchData() {
        let result = await GetStations()
        if(!result.error){
            let stations = result.map((station)=>{
                return <ListGroup.Item key={station.name}>{station.name}</ListGroup.Item>
            })
            SetStations(stations)
        }
    }
    fetchData()
},[])

    return (
        <Container>
            <Image src={FullMapImg} fluid thumbnail />
        </Container>
    )
}
export default Map
/*
if(result.ok){
            if(err) setErr(null)
            let stations = await result.json()
            SetStations(async ()=>{stations.map((s)=>{
                <ListGroupItem>{s.name}</ListGroupItem>
            })})
        }
*/