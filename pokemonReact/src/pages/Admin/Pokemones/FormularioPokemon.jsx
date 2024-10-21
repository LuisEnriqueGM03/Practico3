import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavMenu from "../../../components/NavMenu.jsx";

const FormPokemon = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [nroPokedex, setNroPokedex] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [nivelEvolucion, setNivelEvolucion] = useState('');
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (!id) return;
        getPokemonById();
    }, [id]);

    const getPokemonById = () => {
        axios.get(`http://localhost:3000/pokemons/${id}`)
            .then(res => {
                const pokemon = res.data;
                setNombre(pokemon.nombre);
                setNroPokedex(pokemon.nroPokedex);
                setDescripcion(pokemon.descripcion);
                setNivelEvolucion(pokemon.nivelEvolucion ?? '');
            })
            .catch(error => {
                console.log("Error al obtener el Pokémon:", error);
            });
    };

    const onGuardarClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        setValidated(true);
        if (form.checkValidity() === false) {
            return;
        }
        const pokemon = {
            nombre,
            nroPokedex,
            descripcion,
            nivelEvolucion: nivelEvolucion !== '' ? parseInt(nivelEvolucion) : null,
        };
        if (id) {
            editPokemon(pokemon);
        } else {
            insertPokemon(pokemon);
        }
    };

    const editPokemon = (pokemon) => {
        axios.put(`http://localhost:3000/pokemons/${id}`, pokemon)
            .then(res => {
                console.log("Pokémon actualizado:", res.data);
                navigate(`/pokemones/${id}/detalle`);
            })
            .catch(error => {
                console.log("Error al actualizar el Pokémon:", error);
            });
    };

    const insertPokemon = (pokemon) => {
        axios.post('http://localhost:3000/pokemons', pokemon)
            .then(res => {
                console.log("Pokémon creado:", res.data);
                navigate('/pokemones');
            })
            .catch(error => {
                console.log("Error al crear el Pokémon:", error);
            });
    };

    return (
        <>
            <NavMenu />
            <Container className="mt-4 d-flex justify-content-center">
                <Card className="p-4 fold-big" style={{ width: '500px' }}>
                    <Card.Body>
                        <h2 className="mb-4 text-center">Datos del Pokémon</h2>
                        <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                            <Form.Group controlId="formNombre" className="mb-3">
                                <Form.Label className="title-3">Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresa el nombre del Pokémon"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese un nombre.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formNroPokedex" className="mb-3">
                                <Form.Label className="title-3">Nº Pokedex</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresa el Nº Pokedex"
                                    value={nroPokedex}
                                    onChange={(e) => setNroPokedex(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese un número de pokedex.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formDescripcion" className="mb-3">
                                <Form.Label className="title-3">Descripción</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Ingresa una descripción del Pokémon"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese una descripción.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formNivelEvolucion" className="mb-3">
                                <Form.Label className="title-3">Nivel de Evolución</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingresa el nivel de evolución"
                                    value={nivelEvolucion !== null ? nivelEvolucion : ''}
                                    onChange={(e) => setNivelEvolucion(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese un nivel de evolución válido.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <div className="d-flex justify-content-center">
                                <Button className="btn-tipo" type="submit">
                                    {id ? "Guardar Cambios" : "Guardar Pokémon"}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default FormPokemon;
