import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavMenu from "../../../components/NavMenu.jsx";

const ListaHabilidades = () => {
    const [habilidades, setHabilidades] = useState([]);
    const [filteredHabilidades, setFilteredHabilidades] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getListaHabilidades();
        document.title = "Lista de Habilidades";
    }, []);

    const getListaHabilidades = () => {
        axios.get('http://localhost:3000/habilidades')
            .then(res => {
                setHabilidades(res.data);
                setFilteredHabilidades(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar la habilidad?");
        if (!confirm) return;

        axios.delete(`http://localhost:3000/habilidades/${id}`)
            .then(() => {
                getListaHabilidades();
            })
            .catch(error => {
                console.log(error);
            });
    };

    const busqueda = (e) => {
        const value = e.target.value;
        setSearch(value);
        const filtered = habilidades.filter(habilidad =>
            habilidad.nombre.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredHabilidades(filtered);
    };

    return (
        <>
            <NavMenu />
            <Container className="mt-4">
                <Card className="p-4 fold-big">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="mb-0">Lista de Habilidades</h2>
                            <Form.Control
                                className="busqueda"
                                type="text"
                                placeholder="Buscar por nombre"
                                value={search}
                                onChange={busqueda}
                                style={{ maxWidth: '650px' }}
                            />
                            <Button as={Link} to="/habilidades/crear" className="btn-tipo">
                                <i className="fas fa-plus me-2"></i> Agregar Habilidad
                            </Button>
                        </div>

                        <Row>
                            {filteredHabilidades.map((habilidad) => (
                                <Col xs={12} sm={6} md={4} lg={3} key={habilidad.id} className="mb-4">
                                    <Card className="perfil-card fold-habilidad">
                                        <Card.Body className="d-flex flex-column align-items-center">
                                            <Card.Title className="nombre mb-3 text-center fold-habilidad-card">
                                                {habilidad.nombre}
                                            </Card.Title>

                                            <div className="d-flex justify-content-center">
                                                <Button
                                                    as={Link}
                                                    to={`/habilidades/${habilidad.id}/editar`}
                                                    className="me-2 btn-habilidad"
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </Button>
                                                <Button
                                                    className="btn-habilidad"
                                                    onClick={() => eliminar(habilidad.id)}
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

export default ListaHabilidades;
