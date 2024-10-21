import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavMenu from "../../../components/NavMenu.jsx";

const FormEvolucion = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemones, setPokemones] = useState([]);
    const [evolucionPrevia, setEvolucionPrevia] = useState(null);
    const [evolucionSiguiente, setEvolucionSiguiente] = useState(null);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        getListaPokemones();
        getPokemonById();
    }, []);

    const getListaPokemones = () => {
        axios.get('http://localhost:3000/pokemons')
            .then(res => setPokemones(res.data))
            .catch(error => console.error('Error al obtener la lista de Pokémon:', error));
    };

    const getPokemonById = () => {
        axios.get(`http://localhost:3000/pokemons/${id}`)
            .then(res => {
                const { idEvPrevia, idEvSiguiente } = res.data;
                setEvolucionPrevia(idEvPrevia || null);
                setEvolucionSiguiente(idEvSiguiente || null);
            })
            .catch(error => console.error('Error al obtener el Pokémon:', error));
    };

    const onGuardarClick = (e) => {
        e.preventDefault();
        setValidated(true);
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            return;
        }

        const data = {
            idEvPrevia: evolucionPrevia === "null" ? null : evolucionPrevia,
            idEvSiguiente: evolucionSiguiente === "null" ? null : evolucionSiguiente,
        };

        axios.put(`http://localhost:3000/pokemons/${id}`, data)
            .then(() => {
                console.log("Evolución actualizada");
                navigate(`/pokemones/${id}/detalle`);
            })
            .catch(error => console.error('Error al actualizar la evolución:', error));
    };

    return (
        <>
            <NavMenu />
            <Container className="mt-4 d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Card className="p-4 fold-big" style={{ width: '500px' }}>
                    <Card.Body>
                        <h2 className="mb-4 text-center">Editar Evolución</h2>
                        <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group controlId="formEvolucionPrevia">
                                        <Form.Label className="title-3">Evolución Previa</Form.Label>
                                        <Form.Select
                                            value={evolucionPrevia ?? "null"}
                                            onChange={(e) => setEvolucionPrevia(e.target.value)}
                                            required
                                        >
                                            <option value="null">Ninguno</option>
                                            {pokemones.map((pokemon) => (
                                                <option key={pokemon.id} value={pokemon.id}>
                                                    {pokemon.nombre}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Seleccione una evolución previa
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group controlId="formEvolucionSiguiente">
                                        <Form.Label className="title-3">Evolución Siguiente</Form.Label>
                                        <Form.Select
                                            value={evolucionSiguiente ?? "null"}
                                            onChange={(e) => setEvolucionSiguiente(e.target.value)}
                                            required
                                        >
                                            <option value="null">Ninguno</option>
                                            {pokemones.map((pokemon) => (
                                                <option key={pokemon.id} value={pokemon.id}>
                                                    {pokemon.nombre}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Seleccione una evolución siguiente
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-center">
                                <Button type="submit" className="btn-tipo">
                                    Guardar Evolución
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default FormEvolucion;
