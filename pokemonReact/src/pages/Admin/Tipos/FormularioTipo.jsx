import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavMenu from "../../../components/NavMenu.jsx";

const FormTipo = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (!id) return;
        getTipoById();
    }, [id]);

    const getTipoById = () => {
        axios.get(`http://localhost:3000/tipos/${id}`)
            .then(res => {
                const tipo = res.data;
                setNombre(tipo.nombre);
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

        const tipo = { nombre };

        if (id) {
            editTipo(tipo);
        } else {
            insertTipo(tipo);
        }
    };

    const editTipo = (tipo) => {
        axios.put(`http://localhost:3000/tipos/${id}`, tipo)
            .then(res => {
                console.log("Tipo actualizado:", res.data);
                navigate('/tipos');
            })
            .catch(error => {
                console.log("Error al actualizar el tipo:", error);
            });
    };

    const insertTipo = (tipo) => {
        axios.post('http://localhost:3000/tipos', tipo)
            .then(res => {
                console.log("Tipo creado:", res.data);
                navigate('/tipos');
            })
            .catch(error => {
                console.log("Error al crear el tipo:", error);
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
                        <h2 className="mb-4 text-center">{id ? "Editar Tipo" : "Crear Tipo"}</h2>
                        <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                            <Form.Group controlId="formNombre" className="mb-3">
                                <Form.Label className="title-2">Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresa el nombre del tipo"
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
                                    {id ? "Guardar Cambios" : "Guardar Tipo"}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default FormTipo;
