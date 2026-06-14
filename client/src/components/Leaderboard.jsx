import React from "react";
import {Row,Col,Container,ListGroup,ListGroupItem} from "react-bootstrap"
import { useState,useEffect,useContext } from "react";
import UserContext from "../contexts/UserContext";
import { GetLeaderBoard } from "../api/game-api";
function LeaderBoard(props){
    const user = useContext(UserContext)
    const [LeaderBoard,setLeaderboard] = useState(null)
    useEffect(()=>{
        async function fetchData(){
            const result = await GetLeaderBoard()
            if(!result.error){
                let leaderboard = result.map((r)=>{
                    return <ListGroup.Item key={r.player} active={r.player == user.username}><Row><Col>{r.player}</Col><Col>{r.highscore}</Col></Row></ListGroup.Item>
                })
                setLeaderboard(leaderboard)
            }
            else{
                console.log("something went wrong")
            }
        }
        fetchData()
    })
    return <Container>
        <h1>LeaderBoard</h1>
        <ListGroup>
            <ListGroupItem><Row><Col>Player</Col><Col>Highscore</Col></Row></ListGroupItem>
            {LeaderBoard}
        </ListGroup>
        
    </Container>
}

export default LeaderBoard