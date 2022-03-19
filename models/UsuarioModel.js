import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Usuario = db.define('usuario',{
    id_Usuario:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Email_Usuario:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Senha_Usuario:{
        type: DataTypes.STRING,
        allowNull:false
    }
});
 
export default Usuario;