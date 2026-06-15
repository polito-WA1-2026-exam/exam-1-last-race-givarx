import React from "react";
import { Container,Row,Col,ListGroup,ListGroupItem,Image } from "react-bootstrap";
import { useState,useContext,useEffect } from "react";
import { DUMP_STATION_LIST,DUMP_LINK_LIST,Station,Link } from "../models/Stations";
import { GetStations } from "../api/game-api.js";
import FullMapImg from "../assets/full_map.png"; 
function Map(props){
    return (
        <Container className="min-vh-100 d-flex flex-column align-items-center border border-2 rounded p-4 shadow-smr bg-light">
            <Image src={FullMapImg} fluid thumbnail />
        </Container>
    )
}
export default Map
