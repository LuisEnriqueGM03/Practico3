import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { getLineaEvolutiva } from "../utils/evolucionUtils.js";
import { calcularStatNivel100 } from "../utils/estadisticasUtils.js";
import ClientMenu from "../../components/ClientMenu.jsx";
const DetallePokemon = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [tipos, setTipos] = useState([]);
    const [habilidades, setHabilidades] = useState([]);
    const [lineaEvolutiva, setLineaEvolutiva] = useState([]);

    useEffect(() => {
        getPokemonById();
        getListaTipos();
        getListaHabilidades();
        fetchLineaEvolutiva();
    }, []);

    const getPokemonById = () => {
        axios.get(`http://localhost:3000/pokemons/${id}`)
            .then(res => setPokemon(res.data))
            .catch(error => console.error('Error al obtener el Pokémon:', error));
    };

    const getListaTipos = () => {
        axios.get('http://localhost:3000/tipos')
            .then(res => setTipos(res.data))
            .catch(error => console.log('Error al obtener los tipos:', error));
    };

    const getListaHabilidades = () => {
        axios.get('http://localhost:3000/habilidades')
            .then(res => setHabilidades(res.data))
            .catch(error => console.log('Error al obtener habilidades:', error));
    };

    const getTipo = (idTipo) => tipos.find(tipo => tipo.id === idTipo) || {};
    const getHabilidadNombre = (idHabilidad) => {
        const habilidad = habilidades.find(hab => hab.id === idHabilidad);
        return habilidad ? habilidad.nombre : "N/A";
    };

    const fetchLineaEvolutiva = async () => {
        const evoluciones = await getLineaEvolutiva(parseInt(id));
        setLineaEvolutiva(evoluciones);
    };

    if (!pokemon) {
        return <h2 className="text-center mt-5">Cargando...</h2>;
    }

    return (
        <>
            <ClientMenu/>
            <Container className="mt-4">
                <Card className="p-3 fold-big mb-4">
                    <h1 className="text-center mb-4">{pokemon.nombre}</h1>
                </Card>

                <Card className="p-4 fold-big">
                    <Row>
                        <Col md={4}>
                            <Card className="p-3 text-center fold-sub-card fold-tipo mb-3">
                                <Card.Img variant="top" src={`http://localhost:3000/pokemon/${pokemon.id}.jpg`} className="img-fluid" />
                            </Card>

                            <Card className="p-3 fold-sub-card fold-tipo mb-3">
                                <h5 className="text-center mb-3">Tipos</h5>
                                <Row className="justify-content-center">
                                    {[pokemon.idTipo1, pokemon.idTipo2].map((idTipo, index) => {
                                        const tipo = getTipo(idTipo);
                                        return tipo.id ? (
                                            <Col key={index} xs={6} className="d-flex align-items-center fold-tipo-pokemon-card">
                                                <Card.Img src={`http://localhost:3000/tipo/${tipo.id}.jpg`} className="img-fluid me-3 img-tipo" style={{ maxWidth: '50px' }} />
                                                <span className="nombre mb-0">{tipo.nombre}</span>
                                            </Col>
                                        ) : null;
                                    })}
                                </Row>
                            </Card>

                            <Card className="p-3 fold-sub-card fold-tipo">
                                <h5 className="text-center mb-3">Habilidades</h5>
                                <Row className="justify-content-center">
                                    {[pokemon.idHabilidad1, pokemon.idHabilidad2, pokemon.idHabilidad3].map((idHabilidad, index) => {
                                        const habilidadNombre = getHabilidadNombre(idHabilidad);
                                        return idHabilidad ? (
                                            <Col key={index} xs={6} className="d-flex align-items-center fold-habilidad-pokemon-card">
                                                <span className="nombre mb-0">{habilidadNombre}</span>
                                            </Col>
                                        ) : null;
                                    })}
                                </Row>
                            </Card>
                        </Col>

                        <Col md={8}>
                            <Card className="p-3 fold-sub-card fold-tipo">
                                <Card.Body>
                                    <h3 className="text-center mb-4">Datos</h3>
                                    <Row className="mb-3">
                                        <Col xs={12}><h5>Nº Pokedex: <span className="data-box color no-bold">{pokemon.nroPokedex}</span></h5></Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col xs={12}><h5>Nivel de Evolución:<span className="data-box color no-bold"> {pokemon.nivelEvolucion !== null ? pokemon.nivelEvolucion : "N/A"}</span></h5></Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}><h5>Descripción: <span className="data-box color no-bold">{pokemon.descripcion}</span></h5></Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            <Card className="p-3 mt-4 fold-sub-card fold-tipo">
                                <h3 className="text-center mb-4">Línea Evolutiva</h3>
                                <Row className="justify-content-center align-items-center">
                                    {lineaEvolutiva.map((poke, index) => (
                                        <React.Fragment key={index}>
                                            <Col xs={6} sm={4} md={3} className="mb-3">
                                                <Card
                                                    className="text-center fold-tipo"
                                                    onClick={() => window.location.href = `/pokemones/${poke.id}/detalle`}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <Card.Img
                                                        src={`http://localhost:3000/pokemon/${poke.id}.jpg`}
                                                        className="img-fluid"
                                                    />
                                                    <Card.Body>
                                                        <Card.Title className="nombre">{poke.nombre}</Card.Title>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            {index < lineaEvolutiva.length - 1 && (
                                                <Col xs="auto" className="d-flex align-items-center mb-3">
                                                    <span style={{ fontSize: '2rem', color: '#fff' }}>→</span>
                                                </Col>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </Row>
                            </Card>

                            <Card className="p-3 mt-4 fold-sub-card fold-tipo">
                                <h3 className="text-center mb-4">Estadísticas</h3>
                                <table className="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th>Estadística</th>
                                        <th>Valor Base</th>
                                        <th>Al Nivel 100</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>HP</td>
                                        <td>{pokemon.hp !== null ? pokemon.hp : 'N/A'}</td>
                                        <td>{pokemon.hp !== null ? calcularStatNivel100(pokemon.hp, true) : 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td>Ataque</td>
                                        <td>{pokemon.attack !== null ? pokemon.attack : 'N/A'}</td>
                                        <td>{pokemon.attack !== null ? calcularStatNivel100(pokemon.attack) : 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td>Defensa</td>
                                        <td>{pokemon.defense !== null ? pokemon.defense : 'N/A'}</td>
                                        <td>{pokemon.defense !== null ? calcularStatNivel100(pokemon.defense) : 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td>Ataque Especial</td>
                                        <td>{pokemon.spattack !== null ? pokemon.spattack : 'N/A'}</td>
                                        <td>{pokemon.spattack !== null ? calcularStatNivel100(pokemon.spattack) : 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td>Defensa Especial</td>
                                        <td>{pokemon.spdefense !== null ? pokemon.spdefense : 'N/A'}</td>
                                        <td>{pokemon.spdefense !== null ? calcularStatNivel100(pokemon.spdefense) : 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td>Velocidad</td>
                                        <td>{pokemon.speed !== null ? pokemon.speed : 'N/A'}</td>
                                        <td>{pokemon.speed !== null ? calcularStatNivel100(pokemon.speed) : 'N/A'}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </>
    );
};

export default DetallePokemon;
