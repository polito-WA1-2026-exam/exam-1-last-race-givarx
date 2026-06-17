import NavHead from '../components/NavHead';
import { Container,Row,Col } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
import Rules from '../components/Rules';
function HomePage(props) {
	const navigate = useNavigate()
	return (
		<div className=''>
			<Container className="min-vh-100 d-flex flex-column align-items-center border border-2 rounded p-4 shadow-smr bg-light" style={{ maxWidth: '700px' }}>
				<Rules></Rules>
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
