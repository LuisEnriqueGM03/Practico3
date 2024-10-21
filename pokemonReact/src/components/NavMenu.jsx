import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavMenu = () => {
    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container>
                <Navbar.Brand as={Link} to="/">Dashboard Administrador</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/Dashboard">Inicio</Nav.Link>

                        <NavDropdown title="Pokémon" id="pokemon-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/pokemones">Lista de Pokémon</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/pokemones/crear">Crear Pokémon</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Tipos" id="tipos-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/tipos">Lista de Tipos</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/tipos/crear">Crear Tipo</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Habilidades" id="habilidades-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/habilidades">Lista de Habilidades</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/habilidades/crear">Crear Habilidad</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavMenu;
