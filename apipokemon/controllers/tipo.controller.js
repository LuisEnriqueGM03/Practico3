const db = require("../models");
const Tipo = db.Tipo;

exports.listTipos = async (req, res) => {
    try {
        const tipos = await Tipo.findAll();
        res.json(tipos);
    } catch (error) {
        console.error("Error al listar los tipos:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.getTipoById = async (req, res) => {
    try {
        const tipo = await Tipo.findByPk(req.params.id);
        if (!tipo) {
            return res.status(404).json({ msg: 'Tipo no encontrado' });
        }
        res.json(tipo);
    } catch (error) {
        console.error("Error al obtener el tipo:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.createTipo = async (req, res) => {
    try {
        const tipo = await Tipo.create(req.body);
        res.status(201).json(tipo);
    } catch (error) {
        console.error("Error al crear el tipo:", error);
        res.status(400).json({ error: error.message });
    }
};

exports.updateTipo = async (req, res) => {
    try {
        const [updated] = await Tipo.update(req.body, { where: { id: req.params.id } });
        if (!updated) {
            return res.status(404).json({ msg: 'Tipo no encontrado' });
        }
        res.json({ msg: 'Tipo actualizado exitosamente' });
    } catch (error) {
        console.error("Error al actualizar el tipo:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTipo = async (req, res) => {
    try {
        const deleted = await Tipo.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ msg: 'Tipo no encontrado' });
        }
        res.json({ msg: 'Tipo eliminado exitosamente' });
    } catch (error) {
        console.error("Error al eliminar el tipo:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.uploadPicture = async (req, res) => {
    const id = req.params.id;
    try {
        const tipo = await getTipoOr404(id, res);
        if (!tipo) return;

        if (!req.files || !req.files.imagen) {
            return res.status(400).json({ msg: 'No se ha enviado el archivo' });
        }

        const file = req.files.imagen;
        const fileName = `${tipo.id}.jpg`;

        file.mv(`public/tipo/${fileName}`, (err) => {
            if (err) {
                console.error("Error al mover el archivo:", err);
                return res.status(500).json({ msg: 'Error al subir la imagen' });
            }
            res.json(tipo);
        });
    } catch (error) {
        console.error("Error en el controlador uploadPicture:", error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};
const getTipoOr404 = async (id, res) => {
    try {
        const tipo = await db.Tipo.findByPk(id);
        if (!tipo) {
            res.status(404).json({ msg: 'Tipo no encontrado' });
            return null;
        }
        return tipo;
    } catch (error) {
        console.error("Error al buscar el tipo:", error);
        res.status(500).json({ msg: 'Error en el servidor' });
        return null;
    }
};

