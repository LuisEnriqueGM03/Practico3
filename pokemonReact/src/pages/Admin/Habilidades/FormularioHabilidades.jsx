import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavMenu from "../../../components/NavMenu.jsx";

const FormHabilidad = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (!id) return;
        getHabilidadById();
    }, [id]);

    const getHabilidadById = () => {
        axios.get(`http://localhost:3000/habilidades/${id}`)
            .then(res => {
                const habilidad = res.data;
                setNombre(habilidad.nombre);
            })
            .catch(error => {
                console.log(error);
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

        const habilidad = { nombre };

        if (id) {
            editHabilidad(habilidad);
        } else {
            insertHabilidad(habilidad);
        }
    };

    const editHabilidad = (habilidad) => {
        axios.put(`http://localhost:3000/habilidades/${id}`, habilidad)
            .then(res => {
                console.log("Habilidad actualizada:", res.data);
                navigate('/habilidades');
            })
            .catch(error => {
                console.log("Error al actualizar la habilidad:", error);
            });
    };

    const insertHabilidad = (habilidad) => {
        axios.post('http://localhost:3000/habilidades', habilidad)
            .then(res => {
                console.log("Habilidad creada:", res.data);
                navigate('/habilidades');
            })
            .catch(error => {
                console.log("Error al crear la habilidad:", error);
            });
    };

    return (
        <>
            <NavMenu />
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ height: '100vh' }}
            >
                <Card className="p-4 fold-big" style={{ width: '500px' }}>
                    <Card.Body>
                        <h2 className="mb-4 text-center">{id ? "Editar Habilidad" : "Crear Habilidad"}</h2>
                        <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                            <Form.Group controlId="formNombre" className="mb-3">
                                <Form.Label className="title-2">Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresa el nombre de la habilidad"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese un nombre.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <div className="d-flex justify-content-center">
                                <Button variant="primary" type="submit" className="btn-tipo">
                                    {id ? "Guardar Cambios" : "Guardar Habilidad"}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default FormHabilidad;
