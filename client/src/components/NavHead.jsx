import React from "react";
import {Navbar,Row,Col,Container,Button,Image} from "react-bootstrap"
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import {useNavigate,Outlet,Link} from "react-router"
import Logo from "../assets/Logo.png"
function NavHead(props){
  const user = useContext(UserContext)
    return(<>
        <Navbar className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand ><Link to={"/"}>Last Race</Link></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
             {user.username ? <LogOutButton current={user} doLogout={props.doLogout}></LogOutButton> : <LoginButton doLogin={props.doLogin}/>}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet></Outlet>
    </>
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
  const navigate = useNavigate()
  const logout = ()=>{
    props.doLogout()
    navigate("/")
  }
  return(<Row className="justify-content-center">
   <Col sm={5}>{"Signed in as: "+props.current.username }</Col><Col sm={5}> <Button variant="danger" onClick={()=>{logout()}}> Log out</Button></Col>
  </Row>)
}
export default NavHead