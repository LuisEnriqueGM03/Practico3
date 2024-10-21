import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './style.css';
import NavMenu from '../../components/NavMenu.jsx';

const Dashboard = () => {
    return (
        <>
            <NavMenu />

            <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
                <h1 className="mb-5 text-center">Dashboard Administrador</h1>

                <Row className="justify-content-center" style={{ width: '100%' }}>
                    <Col md={6} lg={4} className="mb-4">
                        <Link to="/Pokemones" className="text-decoration-none">
                            <Card className="text-center fold" style={{ height: '300px', cursor: 'pointer' }}>
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <Card.Title className={"title"}>Pokémones</Card.Title>
                                    <i className="fas fa-dragon fa-8x mb-5"></i>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>

                    <Col md={6} lg={4} className="mb-4">
                        <Link to="/Tipos" className="text-decoration-none">
                            <Card className="text-center fold" style={{ height: '300px', cursor: 'pointer' }}>
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <Card.Title className={"title"}>Tipos</Card.Title>
                                    <i className="fas fa-bolt fa-8x mb-5"></i>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>

                    <Col md={6} lg={4} className="mb-4">
                        <Link to="/Habilidades" className="text-decoration-none">
                            <Card className="text-center fold" style={{ height: '300px', cursor: 'pointer' }}>
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <Card.Title className={"title"}>Habilidades</Card.Title>
                                    <i className="fas fa-star fa-8x mb-5"></i>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Dashboard;
