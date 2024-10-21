const db = require("../models");
const Pokemon = db.Pokemon;

const getPokemonOr404 = async (id, res) => {
    try {
        const pokemon = await Pokemon.findByPk(id);
        if (!pokemon) {
            res.status(404).json({ msg: 'Pokémon no encontrado' });
            return null;
        }
        return pokemon;
    } catch (error) {
        console.error("Error al buscar el Pokémon:", error);
        res.status(500).json({ msg: 'Error en el servidor' });
        return null;
    }
};

exports.listPokemons = async (req, res) => {
    try {
        const pokemons = await Pokemon.findAll();
        res.json(pokemons);
    } catch (error) {
        console.error("Error al listar Pokémon:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.getPokemonById = async (req, res) => {
    try {
        const pokemon = await getPokemonOr404(req.params.id, res);
        if (pokemon) res.json(pokemon);
    } catch (error) {
        console.error("Error al obtener el Pokémon:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.createPokemon = async (req, res) => {
    try {
        const pokemon = await Pokemon.create(req.body);
        res.status(201).json(pokemon);
    } catch (error) {
        console.error("Error al crear el Pokémon:", error);
        res.status(400).json({ error: error.message });
    }
};

exports.updatePokemon = async (req, res) => {
    try {
        const [updated] = await Pokemon.update(req.body, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ msg: 'Pokémon no encontrado' });
        res.json({ msg: 'Pokémon actualizado exitosamente' });
    } catch (error) {
        console.error("Error al actualizar el Pokémon:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.partialUpdatePokemon = async (req, res) => {
    try {
        const [updated] = await Pokemon.update(req.body, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ msg: 'Pokémon no encontrado' });
        res.json({ msg: 'Pokémon actualizado parcialmente' });
    } catch (error) {
        console.error("Error al actualizar parcialmente el Pokémon:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.deletePokemon = async (req, res) => {
    try {
        const deleted = await Pokemon.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ msg: 'Pokémon no encontrado' });
        res.json({ msg: 'Pokémon eliminado exitosamente' });
    } catch (error) {
        console.error("Error al eliminar el Pokémon:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.uploadPicture = async (req, res) => {
    const id = req.params.id;
    try {
        const pokemon = await getPokemonOr404(id, res);
        if (!pokemon) return;

        if (!req.files || !req.files.imagen) {
            return res.status(400).json({ msg: 'No se ha enviado el archivo' });
        }

        const file = req.files.imagen;
        const fileName = `${pokemon.id}.jpg`;

        file.mv(`public/pokemon/${fileName}`, (err) => {
            if (err) {
                console.error("Error al mover el archivo:", err);
                return res.status(500).json({ msg: 'Error al subir la imagen' });
            }
            res.json(pokemon);
        });
    } catch (error) {
        console.error("Error en el controlador uploadPicture:", error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};
