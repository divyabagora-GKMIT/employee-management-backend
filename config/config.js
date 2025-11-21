const dotenv = require("dotenv");
dotenv.config();


module.exports = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    define: {
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true
    },
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
}