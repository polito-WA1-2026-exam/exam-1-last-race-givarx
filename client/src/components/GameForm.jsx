import React, { useContext, useEffect, useState } from "react";
import Stations from "../components/Stations"
import { Link,findLink_pos,DUMP_LINK_LIST } from "../models/Stations";
import { GetLinks,GetRandomStations } from "../api/game-api";
import { Form,Button,ProgressBar,Row,Col } from "react-bootstrap";
import {useNavigate} from "react-router"
import LinkContext from "../contexts/LinkContext"
function GameForm(props){
  const [links,setLinks] = useState([])
  const selectedLinks = useContext(LinkContext)
  const setSelectedLinks = props.selectLinks
  const {randomStations,setRandomStations} = props.randomStations
  //tiemr stuff
  const totalSeconds = 90
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)
  const progress = (secondsLeft / totalSeconds) * 100
  //side effects
  const navigate = useNavigate()
    useEffect(()=>{
      async function fetchData(){
        const result = await GetLinks()
        if(!result.error){
          setLinks(result)
        }
        const stations = await GetRandomStations()
        if(!stations.error){
        setRandomStations(stations)
        }
      }
      fetchData()
      const intervalId = setInterval(() => {
        setSecondsLeft(prev => Math.max(prev - 1, 0))
      }, 1000)
      return () => clearInterval(intervalId)
    },[])
    const toggleLink = (linkId) => {
    setSelectedLinks((prev) =>
      prev.includes(linkId)
        ? prev.filter((id) => id !== linkId)
        : [...prev, linkId]
    );
  };
  useEffect(() => {
  if (secondsLeft === 0) {
      console.log("submitted")
    
    const links = selectedLinks.map((value)=>{
      let ls = value.split("-");
      return new Link(ls[0],ls[1]);
    })
    console.log(selectedLinks)
    navigate("/Game/result")
    }
  }, [secondsLeft])

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log("submitted")
    console.log(selectedLinks)
    
    navigate("/Game/result")
  }

    return (
    <>
    <Stations></Stations>
    {randomStations?.from && (
      <Row>
        <Col>From: {randomStations.from.name}</Col>
        <Col>To: {randomStations.to.name}</Col>
      </Row>
    )}
    <ProgressBar now={progress} label={`${Math.floor(secondsLeft / 60)}m ${secondsLeft % 60}s`}  style={{minWidth: '70%'}}/>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Seleziona i link</Form.Label>

        {links.map((link, index) => {
          const id = `${link.from}-${link.to}`
          const label = `${link.from} → ${link.to} (${link.color})`

          return (
            <Form.Check
              key={id}
              type="checkbox"
              id={id}
              label={label}
              checked={selectedLinks.includes(id)}
              onChange={() => toggleLink(id)}
            />
          );
        })}
      </Form.Group>
      <Button type="submit">Conferma</Button>
    </Form>
    </>
  )
} 
export default GameForm