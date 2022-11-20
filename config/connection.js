//import sequelize 
const Sequalize = require('sequelize');
//require env file
require('dotenv').config();

let sequelize;

sequelize = new Sequalize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;