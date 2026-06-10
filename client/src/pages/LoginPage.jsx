import React from "react"
import { Container,Row,Col,Form,Button } from "react-bootstrap"
function LoginPage(props) {
	return (
		<Container className="min-vh-100 d-flex flex-column align-items-center border border-2 rounded p-4 shadow-smr bg-light" style={{ maxWidth: '700px' }}>
				<Row className="w-100 justify-content-md-center">
					<Form>
      <Form.Group className="mb-3" controlId="formUsernamre">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Example: dummyuser" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Example:" />
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
		<Button variant="outline-secondary" > Go Back</Button>
		</Col>
	  </Row>
    </Form>
                </Row>
			</Container>
	)
}

export default LoginPage
