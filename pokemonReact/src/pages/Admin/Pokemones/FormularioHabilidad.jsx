import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavMenu from "../../../components/NavMenu.jsx";

const FormHabilidades = () => {
    const { id } = useParams();
    const [habilidades, setHabilidades] = useState([]);
    const [habilidad1, setHabilidad1] = useState("");
    const [habilidad2, setHabilidad2] = useState("");
    const [habilidad3, setHabilidad3] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getListaHabilidades();
        getPokemonHabilidades();
    }, []);

    const getListaHabilidades = () => {
        axios.get("http://localhost:3000/habilidades")
            .then((res) => setHabilidades(res.data))
            .catch((error) => console.error("Error al obtener habilidades:", error));
    };

    const getPokemonHabilidades = () => {
        axios.get(`http://localhost:3000/pokemons/${id}`)
            .then((res) => {
                const { idHabilidad1, idHabilidad2, idHabilidad3 } = res.data;
                setHabilidad1(idHabilidad1 || "none");
                setHabilidad2(idHabilidad2 || "none");
                setHabilidad3(idHabilidad3 || "none");
            })
            .catch((error) => console.error("Error al obtener las habilidades del Pokémon:", error));
    };

    const onGuardarClick = (e) => {
        e.preventDefault();

        if (
            (habilidad1 === habilidad2 && habilidad1 !== "none") ||
            (habilidad1 === habilidad3 && habilidad1 !== "none") ||
            (habilidad2 === habilidad3 && habilidad2 !== "none")
        ) {
            setError("Las habilidades no pueden ser las mismas.");
            return;
        }
        const habilidadesSeleccionadas = {
            idHabilidad1: habilidad1 === "none" ? null : parseInt(habilidad1),
            idHabilidad2: habilidad2 === "none" ? null : parseInt(habilidad2),
            idHabilidad3: habilidad3 === "none" ? null : parseInt(habilidad3),
        };

        axios.put(`http://localhost:3000/pokemons/${id}`, habilidadesSeleccionadas)
            .then(() => {
                console.log("Habilidades actualizadas correctamente");
                navigate(`/pokemones/${id}/detalle`);
            })
            .catch((error) => console.error("Error al actualizar habilidades:", error));
    };

    return (
        <>
            <NavMenu />
            <Container className="mt-4 d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Card className="p-4 fold-big" style={{ width: '600px' }}>
                    <Card.Body>
                        <h2 className="mb-4 text-center">Editar Habilidades</h2>
                        {error && <p className="text-danger text-center">{error}</p>}
                        <Form onSubmit={onGuardarClick}>
                            <Form.Group controlId="habilidad1" className="mb-3">
                                <Form.Label className="title-3">Primera Habilidad</Form.Label>
                                <Form.Select
                                    value={habilidad1}
                                    onChange={(e) => setHabilidad1(e.target.value)}
                                >
                                    <option value="none">Ninguna</option>
                                    {habilidades.map((hab) => (
                                        <option key={hab.id} value={hab.id}>{hab.nombre}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId="habilidad2" className="mb-3">
                                <Form.Label className="title-3">Segunda Habilidad</Form.Label>
                                <Form.Select
                                    value={habilidad2}
                                    onChange={(e) => setHabilidad2(e.target.value)}
                                >
                                    <option value="none">Ninguna</option>
                                    {habilidades.map((hab) => (
                                        <option key={hab.id} value={hab.id}>{hab.nombre}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId="habilidad3" className="mb-3">
                                <Form.Label className="title-3">Tercera Habilidad</Form.Label>
                                <Form.Select
                                    value={habilidad3}
                                    onChange={(e) => setHabilidad3(e.target.value)}
                                >
                                    <option value="none">Ninguna</option>
                                    {habilidades.map((hab) => (
                                        <option key={hab.id} value={hab.id}>{hab.nombre}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <div className="d-flex justify-content-center">
                                <Button type="submit" className="btn-tipo">
                                    Guardar Habilidades
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default FormHabilidades;
