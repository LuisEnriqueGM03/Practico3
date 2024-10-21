import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavMenu from "../../../components/NavMenu.jsx";

const FormEstadisticas = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hp, setHp] = useState('');
    const [attack, setAttack] = useState('');
    const [defense, setDefense] = useState('');
    const [spattack, setSpAttack] = useState(null);
    const [spdefense, setSpDefense] = useState(null);
    const [speed, setSpeed] = useState('');
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (id) {
            getEstadisticas();
        }
    }, [id]);

    const getEstadisticas = () => {
        axios.get(`http://localhost:3000/pokemons/${id}`)
            .then(res => {
                const { hp, attack, defense, spattack, spdefense, speed } = res.data;
                setHp(hp);
                setAttack(attack);
                setDefense(defense);
                setSpAttack(spattack);
                setSpDefense(spdefense);
                setSpeed(speed);
            })
            .catch(error => console.error("Error al obtener las estadísticas:", error));
    };

    const onGuardarClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;
        setValidated(true);

        if (form.checkValidity() === false) return;
        const estadisticas = {
            hp: hp || 0,
            attack: attack || 0,
            defense: defense || 0,
            spattack: spattack !== "" ? spattack : null,
            spdefense: spdefense !== "" ? spdefense : null,
            speed: speed || 0,
        };

        axios.put(`http://localhost:3000/pokemons/${id}`, estadisticas)
            .then(() => {
                console.log("Estadísticas guardadas exitosamente");
                navigate(`/pokemones/${id}/detalle`);
            })
            .catch(error => console.error("Error al guardar las estadísticas:", error));
    };

    return (
        <>
            <NavMenu />
            <Container className="mt-4 d-flex justify-content-center">
                <Card className="p-4 fold-big" style={{ width: '500px' }}>
                    <Card.Body>
                        <h2 className="mb-4 text-center">Estadísticas del Pokémon</h2>
                        <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                            <Form.Group controlId="formHp" className="mb-3">
                                <Form.Label className="title-3">HP</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Valor de HP"
                                    value={hp}
                                    onChange={(e) => setHp(e.target.value)}
                                    required
                                    min="0"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Ingresa un valor para HP.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formAttack" className="mb-3">
                                <Form.Label className="title-3">Ataque</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Valor de Ataque"
                                    value={attack}
                                    onChange={(e) => setAttack(e.target.value)}
                                    required
                                    min="0"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Ingresa un valor para Ataque.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formDefense" className="mb-3">
                                <Form.Label className="title-3">Defensa</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Valor de Defensa"
                                    value={defense}
                                    onChange={(e) => setDefense(e.target.value)}
                                    required
                                    min="0"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Ingresa un valor para Defensa.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formSpAttack" className="mb-3">
                                <Form.Label className="title-3">Ataque Especial</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Valor de Ataque Especial"
                                    value={spattack}
                                    onChange={(e) => setSpAttack(e.target.value)}
                                    min="0"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Ingresa un valor para Ataque Especial.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formSpDefense" className="mb-3">
                                <Form.Label className="title-3">Defensa Especial</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Valor de Defensa Especial"
                                    value={spdefense}
                                    onChange={(e) => setSpDefense(e.target.value)}
                                    min="0"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Ingresa un valor para Defensa Especial.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formSpeed" className="mb-3">
                                <Form.Label className="title-3">Velocidad</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Valor de Velocidad"
                                    value={speed}
                                    onChange={(e) => setSpeed(e.target.value)}
                                    required
                                    min="0"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Ingresa un valor para Velocidad.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <div className="d-flex justify-content-center">
                                <Button className="btn-tipo" type="submit">
                                    Guardar Estadísticas
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default FormEstadisticas;
