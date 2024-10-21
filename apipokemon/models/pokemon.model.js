module.exports = (sequelize, Sequelize) => {
    const Pokemon = sequelize.define("pokemon", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nroPokedex: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        idHabilidad1: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        idHabilidad2: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        idHabilidad3: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        idTipo1: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        idTipo2: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        descripcion: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        hp: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        attack: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        defense: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        spattack: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        spdefense: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        speed: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        nivelEvolucion: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        idEvPrevia: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        idEvSiguiente: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null
        }
    });

    return Pokemon;
};
