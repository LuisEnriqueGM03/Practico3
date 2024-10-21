import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavMenu from "../../../components/NavMenu.jsx";

const FormTiposPokemon = () => {
    const navigate = useNavigate();
    const { id } = useParams(); //
    const [tipos, setTipos] = useState([]);
    const [tipo1, setTipo1] = useState("");
    const [tipo2, setTipo2] = useState("");
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        getListaTipos();
        getPokemonById();
    }, [id]);

    const getListaTipos = () => {
        axios.get('http://localhost:3000/tipos')
            .then(res => setTipos(res.data))
            .catch(error => console.log(error));
    };

    const getPokemonById = () => {
        axios.get(`http://localhost:3000/pokemons/${id}`)
            .then(res => {
                const { idTipo1, idTipo2 } = res.data;
                setTipo1(idTipo1 || "none");
                setTipo2(idTipo2 || "none");
            })
            .catch(error => console.log('Error al obtener el Pokémon:', error));
    };

    const onGuardarClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        if (tipo1 === tipo2 && tipo1 !== "none") {
            alert("El Tipo 1 y el Tipo 2 no pueden ser iguales.");
            return;
        }
        const pokemonTipos = {
            idTipo1: tipo1 === "none" ? null : parseInt(tipo1),
            idTipo2: tipo2 === "none" ? null : parseInt(tipo2)
        };
        axios.put(`http://localhost:3000/pokemons/${id}`, pokemonTipos)
            .then(() => {
                console.log("Tipos actualizados correctamente.");
                navigate(`/pokemones/${id}/detalle`);
            })
            .catch(error => console.log("Error al actualizar los tipos:", error));
    };

    return (
        <>
            <NavMenu />
            <Container className="mt-4 d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Card className="p-4 fold-big" style={{ width: '500px' }}>
                    <Card.Body>
                        <h2 className="text-center mb-4">Actualizar Tipos del Pokémon</h2>
                        <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                            <Row className="mb-3">
                                <Col xs={12}>
                                    <Form.Group controlId="formTipo1">
                                        <Form.Label className="title-3">Primer tipo</Form.Label>
                                        <Form.Select
                                            value={tipo1}
                                            onChange={(e) => setTipo1(e.target.value)}
                                            required
                                        >
                                            <option value="none">Ninguno</option>
                                            {tipos.map((tipo) => (
                                                <option key={tipo.id} value={tipo.id}>
                                                    {tipo.nombre}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col xs={12}>
                                    <Form.Group controlId="formTipo2">
                                        <Form.Label className="title-3">Segundo Tipo</Form.Label>
                                        <Form.Select
                                            value={tipo2}
                                            onChange={(e) => setTipo2(e.target.value)}
                                        >
                                            <option value="none">Ninguno</option>
                                            {tipos
                                                .filter((tipo) => tipo.id !== parseInt(tipo1))
                                                .map((tipo) => (
                                                    <option key={tipo.id} value={tipo.id}>
                                                        {tipo.nombre}
                                                    </option>
                                                ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <div className="d-flex justify-content-center">
                                <Button type="submit" className="btn-tipo">
                                    Guardar Tipos
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default FormTiposPokemon;
