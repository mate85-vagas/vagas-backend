import { Sequelize } from "sequelize";
 
const db = new Sequelize('vagas_db', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;