import React, { useState, useEffect } from "react";
import { Row, Col, ListGroupItem, ListGroup, Container, Image } from "react-bootstrap";
import { GetStations } from "../api/game-api";
import Stations_map from "../assets/Stazioni.png";

function Stations(props) {
    const [StationList, SetStations] = useState(undefined);
    const [err, setErr] = useState(null);

    useEffect(() => {
        async function fetchData() {
            let result = await GetStations();
            if (!result.error) {
                let stations = result.map((station) => {
                    return <ListGroup.Item key={station.name}>{station.name}</ListGroup.Item>;
                });
                SetStations(stations);
            } else {
                setErr("error");
            }
        }
        fetchData();
    }, []);

    return (
        <Container>
            <Image src={Stations_map} fluid thumbnail />
        </Container>
    );
}

export default Stations;