import React, { useActionState } from "react"
import { Container,Row,Col,Form,Button } from "react-bootstrap"
import { useContext,useState } from "react"
import UserContext from "../contexts/UserContext";
import {useNavigate} from "react-router"

function LoginPage(props) {
	const user = useContext(UserContext)
	const navigate = useNavigate()
	const [state,actionForm] = useActionState(props.doLogin,{username:'',password:''})

	const handleSubmit = (e) => {
		e.preventDefault()
		const formData = new FormData(e.target)
		const data = {
			username: formData.get('username'),
			password: formData.get('password'),
		}
		props.doLogin(data)
	}
	return (
		<Container className="min-vh-100 d-flex flex-column align-items-center border border-2 rounded p-4 shadow-smr bg-light" style={{ maxWidth: '700px' }}>
				<Row className="w-100 justify-content-md-center">
					<Form onSubmit={(e)=>{ e.preventDefault(); handleSubmit(e) }}>
      <Form.Group className="mb-3" controlId="formUsernamre">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" name="username" placeholder="Example: dummyuser" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Example: dummy123" />
      </Form.Group>
	  <Row>
		<Col sm={2}>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Col>
		<Col sm={2}>
			<Button variant="danger" type="reset"> Cancel</Button>
		</Col>
		<Col sm={3} className="d-flex align-items-end">
		<Button variant="outline-secondary" onClick={()=>navigate("/")}> Go Back</Button>
		</Col>
	  </Row>
    </Form>
                </Row>
			</Container>
	)
}

export default LoginPage
