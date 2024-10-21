import { useState } from "react";
import { Container, Nav, Navbar, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const ClientMenu = () => {
    const [clave, setClave] = useState('');
    const navigate = useNavigate();

    const handleEntrarClick = () => {
        if (clave === 'admin') {
            navigate('/Dashboard');
        } else {
            alert('Clave incorrecta');
        }
    };

    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container>
                <Navbar.Brand as={Link} to="/" className="title-2">Pokedex</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="password"
                            placeholder="Ingrese clave"
                            value={clave}
                            onChange={(e) => setClave(e.target.value)}
                            className="me-2"
                        />
                        <Button className="btn-tipo" onClick={handleEntrarClick}>
                            Acceder
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default ClientMenu;
