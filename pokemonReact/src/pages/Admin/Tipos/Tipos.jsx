import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavMenu from "../../../components/NavMenu.jsx";

const ListaTipos = () => {
    const [tipos, setTipos] = useState([]);
    const [filteredTipos, setFilteredTipos] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getListaTipos();
        document.title = "Lista de Tipos";
    }, []);

    const getListaTipos = () => {
        axios.get('http://localhost:3000/tipos')
            .then(res => {
                setTipos(res.data);
                setFilteredTipos(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar el tipo?");
        if (!confirm) return;

        axios.delete(`http://localhost:3000/tipos/${id}`)
            .then(() => {
                getListaTipos();
            })
            .catch(error => {
                console.log(error);
            });
    };

    const busqueda = (e) => {
        const value = e.target.value;
        setSearch(value);
        const filtered = tipos.filter(tipo =>
            tipo.nombre.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredTipos(filtered);
    };

    return (
        <>
            <NavMenu />
            <Container className="mt-4">
                <Card className="p-4 fold-big">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="mb-0">Lista de Tipos</h2>
                            <Form.Control
                                className="busqueda"
                                type="text"
                                placeholder="Buscar por nombre"
                                value={search}
                                onChange={busqueda}
                                style={{ maxWidth: '650px' }}
                            />
                            <Button as={Link} to="/tipos/crear" className="btn-tipo">
                                <i className="fas fa-plus me-2"></i> Agregar Tipo
                            </Button>
                        </div>

                        <Row>
                            {filteredTipos.map((tipo) => (
                                <Col xs={12} sm={6} md={4} lg={3} key={tipo.id} className="mb-4">
                                    <Card className="perfil-card fold-tipo">
                                        <Card.Body className="d-flex flex-column align-items-center">
                                            <Card className="mb-3 fold-tipo-card" >
                                                <Card.Body className="d-flex align-items-center">
                                                    <Card.Img
                                                        src={`http://localhost:3000/tipo/${tipo.id}.jpg`}
                                                        className="img-fluid me-3 img-tipo"
                                                    />
                                                    <Card.Title className="nombre mb-0">{tipo.nombre}</Card.Title>
                                                </Card.Body>
                                            </Card>
                                            <div className="d-flex justify-content-center">
                                                <Button
                                                    as={Link}
                                                    to={`/tipos/${tipo.id}/editar`}
                                                    className="me-2 btn-tipo"
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </Button>
                                                <Button
                                                    as={Link}
                                                    to={`/tipos/${tipo.id}/foto`}
                                                    className="me-2 btn-tipo"
                                                >
                                                    <i className="fas fa-camera"></i>
                                                </Button>
                                                <Button
                                                    className="btn-tipo"
                                                    onClick={() => eliminar(tipo.id)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default ListaTipos;
