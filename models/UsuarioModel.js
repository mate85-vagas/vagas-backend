import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Usuario = db.define('usuario',{
    idUsuario:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    emailUsuario:{
        type: DataTypes.STRING,
        allowNull: false
    },
    senhaUsuario:{
        type: DataTypes.STRING,
        allowNull:false
    }
});
 
export default Usuario;