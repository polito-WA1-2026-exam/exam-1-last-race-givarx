import NavHead from '../components/NavHead';
import { Container,Row,Col } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
function HomePage(props) {
	const navigate = useNavigate()
	return (
		<div className=''>
			<Container className="min-vh-100 d-flex flex-column align-items-center border border-2 rounded p-4 shadow-smr bg-light" style={{ maxWidth: '700px' }}>
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
                <Row className="w-100 justify-content-md-center mt-3">
                    <Col className='d-flex justify-content-center'>
                        <Button variant="success" size="lg" onClick={()=>{navigate("/GameLobby")}}>Go into The Game Section</Button>
                    </Col>
                </Row>
			</Container>
		</div>
	);
}

export default HomePage;
