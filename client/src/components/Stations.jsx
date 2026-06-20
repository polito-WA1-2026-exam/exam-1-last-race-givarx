import React, { useState, useEffect } from "react";
import { Row, Col, ListGroupItem, ListGroup, Container, Image } from "react-bootstrap";
import { GetStations } from "../api/game-api";
import Stations_map from "../assets/Stazioni.png";

function Stations(props) {

    return (
        <Container>
            <Image src={Stations_map} fluid thumbnail />
        </Container>
    );
}

export default Stations;