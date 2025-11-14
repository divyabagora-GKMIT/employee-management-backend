const {Sequelize } = require("sequelize");
const config = require("./config.js")

const sequelize = new Sequelize({
    dialect : config.development.dialect ,
    database: config.development.name,
    user : config.development.user,
    password: config.development.password,
    host: config.development.host,
    port: config.development.port,

    pool: {
        max: 20,
        min: 0 ,
        acquire: 30000,
        idle: 10000
    }
})

module.exports = sequelize;

