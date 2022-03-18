import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Vaga = db.define('vaga',{
    id_Vaga:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Descricao_Vaga:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    Titulo_Vaga:{
        type: DataTypes.STRING(60),
        allowNull: false
    },
    Tipo_Vaga:{
        type: DataTypes.STRING(12),
        allowNull: false
    },
    Local_Vaga:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    Carga_Vaga:{
        type:DataTypes.DOUBLE,
        allowNull: false
    },
    Prazo_Vaga:{
        type:DataTypes.DATE,
        allowNull: false
    }
});
 
export default Vaga;