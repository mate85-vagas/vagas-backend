import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Usuario from "./UsuarioModel.js";
 
const { DataTypes } = Sequelize;
 
const Vaga = db.define('vaga',{
    idVaga:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    descricaoVaga:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    tituloVaga:{
        type: DataTypes.STRING(60),
        allowNull: false
    },
    tipoVaga:{
        type: DataTypes.STRING(12),
        allowNull: false
    },
    localVaga:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    cargaVaga:{
        type:DataTypes.DOUBLE,
        allowNull: false
    },
    salarioVaga:{
        type:DataTypes.DOUBLE,
        allowNull: false
    },
    prazoVaga:{
        type:DataTypes.DATE,
        allowNull: false
    }
});

Usuario.hasMany(Vaga);
Vaga.belongsTo(Usuario);
 
export default Vaga;