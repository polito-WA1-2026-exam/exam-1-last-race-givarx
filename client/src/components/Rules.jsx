import React from "react";
import { Row,Col,Button,ListGroup } from "react-bootstrap";

function Rules(props){
    return <>
        <Row className="w-100 justify-content-md-center">
					<Col className="text-center">
						<h2>Game Rules</h2>
					</Col>
				</Row>
				<Row className="w-100 justify-content-md-center mt-3">
					<Col className="text-center">
						<ListGroup>
							<ListGroup.Item>1. Login with an account</ListGroup.Item>
							<ListGroup.Item>2. Press <Button variant="outline-danger" size="sm">Start Game</Button> Button</ListGroup.Item>
							<ListGroup.Item>3. Select the path to link the Stations in 90 Seconds!</ListGroup.Item>
							<ListGroup.Item>4. Submit and see the Results!</ListGroup.Item>
						</ListGroup>
					</Col>
				</Row>
    </>
}
export default Rules