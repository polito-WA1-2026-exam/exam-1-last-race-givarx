import React from "react";
import {Navbar,Row,Col,Container,Button} from "react-bootstrap"
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import {useNavigate} from "react-router"
function NavHead(props){
  const user = useContext(UserContext)
    return(
        <Navbar className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand >Last Race</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
             {user.username ? <LogOutButton current={user}></LogOutButton> : <LoginButton doLogin={props.doLogin}/>}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}
function LoginButton(props){
  const navigate = useNavigate()
  return(<>
  <Button variant="primary" onClick={()=>{
      navigate("/login")
  }}> Log In</Button>
  </>)
}
function LogOutButton(props){
  return(<Row className="justify-content-center">
   <Col sm={5}>{"Signed in as: "+props.current.username }</Col><Col sm={5}> <Button variant="danger"> Log out</Button></Col>
  </Row>)
}
export default NavHead