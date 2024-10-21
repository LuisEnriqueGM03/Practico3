const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.Pokemon = require("./pokemon.model.js")(sequelize, Sequelize);
db.Tipo = require("./tipo.model.js")(sequelize, Sequelize);
db.Habilidad = require("./habilidad.model.js")(sequelize, Sequelize);


db.Pokemon.belongsTo(db.Tipo, { as: "tipoPrimario", foreignKey: "idTipo1" });
db.Pokemon.belongsTo(db.Tipo, { as: "tipoSecundario", foreignKey: "idTipo2" });

db.Pokemon.belongsTo(db.Habilidad, { as: "habilidad1", foreignKey: "idHabilidad1" });
db.Pokemon.belongsTo(db.Habilidad, { as: "habilidad2", foreignKey: "idHabilidad2" });
db.Pokemon.belongsTo(db.Habilidad, { as: "habilidad3", foreignKey: "idHabilidad3" });

module.exports = db;
