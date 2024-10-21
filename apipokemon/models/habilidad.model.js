module.exports = (sequelize, Sequelize) => {
    const Habilidad = sequelize.define("habilidade", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    });

    return Habilidad;
};
