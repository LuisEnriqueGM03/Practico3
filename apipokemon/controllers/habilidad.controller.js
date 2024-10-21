const db = require("../models");
const Habilidad = db.Habilidad;

exports.listHabilidades = async (req, res) => {
    try {
        const habilidades = await Habilidad.findAll();
        res.json(habilidades);
    } catch (error) {
        console.error("Error al listar las habilidades:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.getHabilidadById = async (req, res) => {
    try {
        const habilidad = await Habilidad.findByPk(req.params.id);
        if (!habilidad) {
            return res.status(404).json({ msg: 'Habilidad no encontrada' });
        }
        res.json(habilidad);
    } catch (error) {
        console.error("Error al obtener la habilidad:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.createHabilidad = async (req, res) => {
    try {
        const habilidad = await Habilidad.create(req.body);
        res.status(201).json(habilidad);
    } catch (error) {
        console.error("Error al crear la habilidad:", error);
        res.status(400).json({ error: error.message });
    }
};

exports.updateHabilidad = async (req, res) => {
    try {
        const [updated] = await Habilidad.update(req.body, { where: { id: req.params.id } });
        if (!updated) {
            return res.status(404).json({ msg: 'Habilidad no encontrada' });
        }
        res.json({ msg: 'Habilidad actualizada exitosamente' });
    } catch (error) {
        console.error("Error al actualizar la habilidad:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteHabilidad = async (req, res) => {
    try {
        const deleted = await Habilidad.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ msg: 'Habilidad no encontrada' });
        }
        res.json({ msg: 'Habilidad eliminada exitosamente' });
    } catch (error) {
        console.error("Error al eliminar la habilidad:", error);
        res.status(500).json({ error: error.message });
    }
};
