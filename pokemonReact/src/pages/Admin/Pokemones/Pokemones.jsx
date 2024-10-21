import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavMenu from "../../../components/NavMenu.jsx";

const ListaPokemones = () => {
    const [pokemones, setPokemones] = useState([]);
    const [filteredPokemones, setFilteredPokemones] = useState([]);
    const [searchNombre, setSearchNombre] = useState("");
    const [searchPokedex, setSearchPokedex] = useState("");
    const [tipos, setTipos] = useState([]);
    const [selectedTipoId, setSelectedTipoId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getListaPokemones();
        getListaTipos();
        document.title = "Lista de Pokemones";
    }, []);

    useEffect(() => {
        const sortedPokemones = [...pokemones].sort((a, b) =>
            parseInt(a.nroPokedex) - parseInt(b.nroPokedex)
        );
        setFilteredPokemones(sortedPokemones);
    }, [pokemones]);

    const getListaPokemones = () => {
        axios.get('http://localhost:3000/pokemons')
            .then(res => setPokemones(res.data))
            .catch(error => console.log(error));
    };

    const getListaTipos = () => {
        axios.get('http://localhost:3000/tipos')
            .then(res => setTipos(res.data))
            .catch(error => console.log(error));
    };

    const handleSearchNombre = (e) => {
        const value = e.target.value;
        setSearchNombre(value);
        filterPokemones(value, searchPokedex, selectedTipoId);
    };

    const handleSearchPokedex = (e) => {
        const value = e.target.value;
        setSearchPokedex(value);
        filterPokemones(searchNombre, value, selectedTipoId);
    };

    const handleTipoChange = (e) => {
        const tipoId = e.target.value;
        setSelectedTipoId(tipoId);
        filterPokemones(searchNombre, searchPokedex, tipoId);
    };

    const filterPokemones = (nombre, nroPokedex, tipoId) => {
        let filtered = [...pokemones];

        if (nombre) {
            filtered = filtered.filter(pokemon =>
                pokemon.nombre.toLowerCase().includes(nombre.toLowerCase())
            );
        }

        if (nroPokedex) {
            filtered = filtered.filter(pokemon =>
                pokemon.nroPokedex.includes(nroPokedex)
            );
        }

        if (tipoId) {
            filtered = filtered.filter(pokemon =>
                pokemon.idTipo1 === parseInt(tipoId) || pokemon.idTipo2 === parseInt(tipoId)
            );
        }

        setFilteredPokemones(filtered);
    };

    const handleCardClick = (id) => {
        navigate(`/pokemones/${id}/detalle`);
    };

    const getTipoNombre = (id) => {
        const tipo = tipos.find(tipo => tipo.id === id);
        return tipo ? tipo.nombre : '';
    };

    return (
        <>
            <NavMenu />
            <Container className="mt-4">
                <Card className="p-4 fold-big">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="mb-0">Lista de Pokemones</h2>
                            <Button onClick={() => navigate("/pokemones/crear")} className="btn-tipo">
                                <i className="fas fa-plus me-2"></i> Nuevo Pokemon
                            </Button>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <Form.Control
                                type="text"
                                placeholder="Buscar por nombre"
                                value={searchNombre}
                                onChange={handleSearchNombre}
                                className="me-2 busqueda"
                                style={{ maxWidth: '700px' }}
                            />
                            <Form.Control
                                type="text"
                                placeholder="Buscar por Nº Pokedex"
                                value={searchPokedex}
                                onChange={handleSearchPokedex}
                                className="me-2 busqueda"
                                style={{ maxWidth: '200px' }}
                            />
                            <Form.Select
                                value={selectedTipoId}
                                onChange={handleTipoChange}
                                className="me-2 busqueda"
                                style={{ maxWidth: '250px' }}
                            >
                                <option value="">Todos los Tipos</option>
                                {tipos.map((tipo) => (
                                    <option key={tipo.id} value={tipo.id}>
                                        {tipo.nombre}
                                    </option>
                                ))}
                            </Form.Select>
                        </div>

                        <Row>
                            {filteredPokemones.map((pokemon) => (
                                <Col md={3} key={pokemon.id} className="mb-4">
                                    <Card
                                        className="peli-card fold-pokemon"
                                        onClick={() => handleCardClick(pokemon.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <img
                                            className="pokemon"
                                            src={`http://localhost:3000/pokemon/${pokemon.id}.jpg`}
                                            alt={`Imagen de ${pokemon.nombre}`}
                                        />
                                        <Card.Body className="d-flex flex-column justify-content-between">
                                            <Card.Title className="text-center nombre">
                                                {pokemon.nombre} - #{pokemon.nroPokedex}
                                            </Card.Title>
                                            <div className="text-center">
                                                <span className="text-center fold-tipo-pokemon">{getTipoNombre(pokemon.idTipo1)}</span>
                                                {pokemon.idTipo2 && (
                                                    <span className="text-center fold-tipo-pokemon"> {getTipoNombre(pokemon.idTipo2)}</span>
                                                )}
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

export default ListaPokemones;
