import React, { useEffect, useState } from "react";
import Stations from "../components/Stations"
import { Link,findLink_pos,DUMP_LINK_LIST } from "../models/Stations";
import { GetLinks } from "../api/game-api";
import { Form,Button } from "react-bootstrap";
import {useOutletContext} from "react-router"
function GameForm(props){
    const [links,setLinks] = useState([])
   const { selectedLinks, setSelectedLinks } = useOutletContext();

    useEffect(()=>{
      async function fetchData(){
        const result = await GetLinks()
        if(!result.error){
          setLinks(result)
        }
      }
      fetchData()
    },[])
    const toggleLink = (linkId) => {
    setSelectedLinks((prev) =>
      prev.includes(linkId)
        ? prev.filter((id) => id !== linkId)
        : [...prev, linkId]
    );
  };
    const handleSubmit = (e)=>{
      e.preventDefault();
      console.log("submitted")
      console.log(selectedLinks)
    }

     return (
     <>
     <Stations></Stations>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Seleziona i link</Form.Label>

        {links.map((link, index) => {
          const id = `${link.from}-${link.to}-${index}`
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